import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import OutCall "http-outcalls/outcall";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  type DietType = { #vegetarian; #vegan; #keto; #paleo; #omnivore };
  type HealthGoal = { #loseWeight; #gainMuscle; #maintainWeight; #eatHealthier };
  type MacroRatio = { protein : Nat; carbs : Nat; fat : Nat };
  type Ingredient = { name : Text; quantity : Nat; unit : Text; category : Text };
  type Meal = {
    name : Text;
    description : Text;
    calories : Nat;
    protein : Nat;
    carbs : Nat;
    fat : Nat;
    prepTime : Nat;
    ingredients : [Ingredient];
  };
  type DayMeals = { breakfast : Meal; lunch : Meal; dinner : Meal; snacks : [Meal] };
  type MealPlan = { days : [DayMeals] };
  type GroceryItem = { name : Text; quantity : Nat; unit : Text; category : Text; checked : Bool };
  type AuraUserRole = { #admin; #user };
  type NutritionLog = { calories : Nat; protein : Nat; carbs : Nat; fat : Nat };

  type UserProfile = {
    dietType : DietType;
    healthGoal : HealthGoal;
    allergies : [Text];
    favoriteFoods : [Text];
    calorieTarget : Nat;
    macroRatio : MacroRatio;
  };

  module UserProfile {
    public func compare(p1 : UserProfile, p2 : UserProfile) : { #less; #equal; #greater } {
      Nat.compare(p1.calorieTarget, p2.calorieTarget);
    };
  };

  type UserData = {
    profile : UserProfile;
    mealPlan : ?MealPlan;
    groceryList : [GroceryItem];
    foodLog : { calories : Nat; protein : Nat; carbs : Nat; fat : Nat };
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userData = Map.empty<Principal, UserData>();

  // Helper functions
  func getUserData(caller : Principal) : UserData {
    switch (userData.get(caller)) {
      case (null) { Runtime.trap("User not found. Please register first.") };
      case (?data) { data };
    };
  };

  // 1. User profiles
  public shared ({ caller }) func registerUser(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register");
    };
    let data : UserData = {
      profile;
      mealPlan = null;
      groceryList = [];
      foodLog = { calories = 0; protein = 0; carbs = 0; fat = 0 };
    };
    userData.add(caller, data);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    switch (userData.get(caller)) {
      case (null) { null };
      case (?data) { ?data.profile };
    };
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (userData.get(user)) {
      case (null) { null };
      case (?data) { ?data.profile };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let data = getUserData(caller);
    userData.add(caller, { data with profile });
  };

  public shared ({ caller }) func updateUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };
    let data = getUserData(caller);
    userData.add(caller, { data with profile });
  };

  // 2. Meal plans
  public query ({ caller }) func getMealPlan() : async ?MealPlan {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their meal plan");
    };
    getUserData(caller).mealPlan;
  };

  public shared ({ caller }) func saveMealPlan(mealPlan : MealPlan) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save meal plans");
    };
    let data = getUserData(caller);
    userData.add(caller, { data with mealPlan = ?mealPlan });
  };

  // 3. Grocery lists
  public shared ({ caller }) func addGroceryItem(item : GroceryItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add grocery items");
    };
    let data = getUserData(caller);
    let updatedItem = { item with checked = false };
    userData.add(caller, { data with groceryList = data.groceryList.concat([updatedItem]) });
  };

  public query ({ caller }) func getGroceryList() : async [GroceryItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their grocery list");
    };
    getUserData(caller).groceryList;
  };

  public shared ({ caller }) func toggleGroceryItemChecked(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can toggle grocery items");
    };
    let data = getUserData(caller);
    let updatedList = data.groceryList.map(
      func(item) {
        if (item.name == name) { { item with checked = not item.checked } } else { item };
      }
    );
    userData.add(caller, { data with groceryList = updatedList });
  };

  // 4. Nutrition tracking
  public shared ({ caller }) func logNutrition(log : NutritionLog) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log nutrition");
    };
    let data = getUserData(caller);
    let currentLog = data.foodLog;
    let updatedLog = {
      calories = currentLog.calories + log.calories;
      protein = currentLog.protein + log.protein;
      carbs = currentLog.carbs + log.carbs;
      fat = currentLog.fat + log.fat;
    };
    userData.add(caller, { data with foodLog = updatedLog });
  };

  public query ({ caller }) func getNutritionLog() : async NutritionLog {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their nutrition log");
    };
    getUserData(caller).foodLog;
  };

  // 5. AI generation - example placeholder for AI meal plan generation
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func generateMealPlan(apiUrl : Text, headers : [OutCall.Header]) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate meal plans");
    };
    ignore getUserData(caller); // Ensure user exists
    await OutCall.httpGetRequest(apiUrl, headers, transform);
  };
};
