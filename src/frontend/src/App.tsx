import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock,
  Flame,
  LayoutDashboard,
  Leaf,
  Loader2,
  LogOut,
  Menu,
  ShoppingCart,
  UserCircle,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type DayMeals,
  DietType,
  type GroceryItem,
  HealthGoal,
  type Meal,
  type MealPlan,
  type NutritionLog,
  type UserProfile,
} from "./backend";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { SAMPLE_MEAL_PLAN } from "./sampleData";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  | "dashboard"
  | "weekly"
  | "recipes"
  | "grocery"
  | "nutrition"
  | "profile";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DIET_OPTIONS = [
  {
    value: DietType.omnivore,
    label: "Omnivore",
    emoji: "🍽️",
    desc: "All foods",
  },
  {
    value: DietType.vegetarian,
    label: "Vegetarian",
    emoji: "🥗",
    desc: "No meat",
  },
  { value: DietType.vegan, label: "Vegan", emoji: "🌱", desc: "Plant-based" },
  { value: DietType.keto, label: "Keto", emoji: "🥩", desc: "Low carb" },
  { value: DietType.paleo, label: "Paleo", emoji: "🍖", desc: "Whole foods" },
];

const GOAL_OPTIONS = [
  {
    value: HealthGoal.loseWeight,
    label: "Lose Weight",
    emoji: "🔥",
    desc: "Burn calories",
  },
  {
    value: HealthGoal.gainMuscle,
    label: "Gain Muscle",
    emoji: "💪",
    desc: "Build strength",
  },
  {
    value: HealthGoal.maintainWeight,
    label: "Maintain",
    emoji: "⚖️",
    desc: "Stay balanced",
  },
  {
    value: HealthGoal.eatHealthier,
    label: "Eat Healthier",
    emoji: "🥦",
    desc: "Better nutrition",
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  Produce: "🥬",
  Proteins: "🍗",
  Dairy: "🧀",
  Grains: "🌾",
  Pantry: "🫙",
};

// ─── Calorie Donut ────────────────────────────────────────────────────────────
function CalorieDonut({ eaten, target }: { eaten: number; target: number }) {
  const pct = Math.min(eaten / Math.max(target, 1), 1);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <div className="flex flex-col items-center">
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        role="img"
        aria-label="Calorie progress"
      >
        <title>Calorie progress</title>
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="oklch(var(--border))"
          strokeWidth="14"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="oklch(var(--primary))"
          strokeWidth="14"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text
          x="70"
          y="64"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="oklch(var(--foreground))"
        >
          {eaten}
        </text>
        <text
          x="70"
          y="82"
          textAnchor="middle"
          fontSize="12"
          fill="oklch(var(--muted-foreground))"
        >
          / {target} kcal
        </text>
      </svg>
      <p className="text-sm text-muted-foreground mt-1">Calories today</p>
    </div>
  );
}

// ─── Meal Card ────────────────────────────────────────────────────────────────
function MealCard({
  meal,
  label,
  onView,
}: { meal: Meal; label: string; onView: () => void }) {
  const mealColors: Record<string, string> = {
    Breakfast: "bg-amber-100 text-amber-800",
    Lunch: "bg-emerald-100 text-emerald-800",
    Dinner: "bg-violet-100 text-violet-800",
    Snack: "bg-rose-100 text-rose-800",
  };
  const colorClass = mealColors[label] ?? "bg-muted text-muted-foreground";
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${colorClass}`}
            >
              {label}
            </span>
            <h3 className="font-semibold text-sm leading-snug mb-1 truncate">
              {meal.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {meal.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {Number(meal.calories)} kcal
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {Number(meal.prepTime)} min
              </span>
            </div>
            <div className="flex gap-1 mt-2">
              <div
                className="flex-1 h-1.5 rounded-full bg-blue-200"
                title={`Protein: ${meal.protein}g`}
              >
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.min((Number(meal.protein) / 60) * 100, 100)}%`,
                  }}
                />
              </div>
              <div
                className="flex-1 h-1.5 rounded-full bg-amber-200"
                title={`Carbs: ${meal.carbs}g`}
              >
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{
                    width: `${Math.min((Number(meal.carbs) / 80) * 100, 100)}%`,
                  }}
                />
              </div>
              <div
                className="flex-1 h-1.5 rounded-full bg-rose-200"
                title={`Fat: ${meal.fat}g`}
              >
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{
                    width: `${Math.min((Number(meal.fat) / 40) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-xs"
          onClick={onView}
        >
          View Recipe <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Recipe Dialog ────────────────────────────────────────────────────────────
function RecipeDialog({
  meal,
  open,
  onClose,
}: { meal: Meal | null; open: boolean; onClose: () => void }) {
  if (!meal) return null;
  const totalCal = Number(meal.calories);
  const p = Number(meal.protein);
  const c = Number(meal.carbs);
  const f = Number(meal.fat);
  const maxMacro = Math.max(p, c, f, 1);
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {meal.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{meal.description}</p>
          <div className="flex gap-3 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              <Flame className="w-3 h-3 mr-1" />
              {totalCal} kcal
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {Number(meal.prepTime)} min prep
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Macros</h4>
            <div className="space-y-2">
              {[
                ["Protein", p, "bg-blue-500"],
                ["Carbs", c, "bg-amber-500"],
                ["Fat", f, "bg-rose-500"],
              ].map(([name, val, cls]) => (
                <div key={String(name)} className="flex items-center gap-3">
                  <span className="text-xs w-14 text-muted-foreground">
                    {name}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${cls}`}
                      style={{ width: `${(Number(val) / maxMacro) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium w-10 text-right">
                    {val}g
                  </span>
                </div>
              ))}
            </div>
          </div>
          {meal.ingredients.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-3">Ingredients</h4>
              <ul className="space-y-1.5">
                {meal.ingredients.map((ing) => (
                  <li key={ing.name} className="flex justify-between text-sm">
                    <span>{ing.name}</span>
                    <span className="text-muted-foreground">
                      {Number(ing.quantity)} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.96_0.03_145)] to-[oklch(0.92_0.06_85)] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
          <UtensilsCrossed className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          AI Meal Planner
        </h1>
        <p className="text-accent font-semibold text-sm mb-3">
          Eat Smart, Live Better
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Your personal nutrition assistant. Get customized meal plans, track
          your goals, and simplify healthy eating.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { emoji: "🧠", text: "Smart meal plans" },
            { emoji: "🥗", text: "All diet types" },
            { emoji: "🛒", text: "Grocery lists" },
            { emoji: "🎯", text: "Nutrition tracking" },
          ].map((f) => (
            <div
              key={f.text}
              className="bg-white/60 backdrop-blur rounded-xl p-3 text-left"
            >
              <span className="text-xl">{f.emoji}</span>
              <p className="text-xs font-medium mt-1 text-foreground">
                {f.text}
              </p>
            </div>
          ))}
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={login}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Leaf className="w-4 h-4 mr-2" />
          )}
          {isLoggingIn ? "Connecting..." : "Get Started with Internet Identity"}
        </Button>
      </div>
    </div>
  );
}

// ─── Onboarding Wizard ────────────────────────────────────────────────────────
function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const { actor } = useActor();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [dietType, setDietType] = useState<DietType>(DietType.omnivore);
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(
    HealthGoal.eatHealthier,
  );
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(30);
  const [carbs, setCarbs] = useState(45);
  const [fat, setFat] = useState(25);
  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [favInput, setFavInput] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const addChip = (
    val: string,
    list: string[],
    setter: (v: string[]) => void,
    clear: () => void,
  ) => {
    const trimmed = val.trim();
    if (trimmed && !list.includes(trimmed)) setter([...list, trimmed]);
    clear();
  };

  const handleComplete = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      const profile: UserProfile = {
        dietType,
        healthGoal,
        calorieTarget: BigInt(calories),
        macroRatio: {
          protein: BigInt(protein),
          carbs: BigInt(carbs),
          fat: BigInt(fat),
        },
        allergies,
        favoriteFoods: favorites,
      };
      await actor.registerUser(profile);
      toast.success("Profile created! Welcome to AI Meal Planner.");
      onComplete();
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-1">
              What\'s your diet?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Choose the eating style that fits your lifestyle.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {DIET_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setDietType(opt.value)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    dietType === opt.value
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button className="w-full mt-6" onClick={() => setStep(1)}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-1">Your goal?</h2>
            <p className="text-muted-foreground text-sm mb-6">
              What are you working towards?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {GOAL_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setHealthGoal(opt.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                    healthGoal === opt.value
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <p className="font-semibold text-sm">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(0)}
              >
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(2)}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-1">
              Fine-tune your plan
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Set your daily targets.
            </p>
            <div className="space-y-5">
              <div>
                <Label className="text-sm font-semibold">
                  Daily Calories: {calories} kcal
                </Label>
                <Slider
                  min={1200}
                  max={3500}
                  step={50}
                  value={[calories]}
                  onValueChange={([v]) => setCalories(v)}
                  className="mt-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1200</span>
                  <span>3500</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  Macros (must sum to 100)
                </Label>
                <div className="space-y-3 mt-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-blue-600 font-medium">Protein</span>
                      <span>{protein}%</span>
                    </div>
                    <Slider
                      min={10}
                      max={60}
                      value={[protein]}
                      onValueChange={([v]) => {
                        setProtein(v);
                        const rem = 100 - v;
                        setCarbs(Math.round(rem * 0.65));
                        setFat(100 - v - Math.round(rem * 0.65));
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-amber-600 font-medium">Carbs</span>
                      <span>{carbs}%</span>
                    </div>
                    <Slider
                      min={10}
                      max={70}
                      value={[carbs]}
                      onValueChange={([v]) => {
                        setCarbs(v);
                        setFat(100 - protein - v);
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-rose-600 font-medium">Fat</span>
                    <span className={fat < 0 ? "text-destructive" : ""}>
                      {fat}%
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Allergies</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="e.g. peanuts"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addChip(allergyInput, allergies, setAllergies, () =>
                        setAllergyInput(""),
                      )
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addChip(allergyInput, allergies, setAllergies, () =>
                        setAllergyInput(""),
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allergies.map((a) => (
                    <Badge
                      key={a}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() =>
                        setAllergies(allergies.filter((x) => x !== a))
                      }
                    >
                      {a} ×
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Favorite Foods</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="e.g. salmon"
                    value={favInput}
                    onChange={(e) => setFavInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addChip(favInput, favorites, setFavorites, () =>
                        setFavInput(""),
                      )
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addChip(favInput, favorites, setFavorites, () =>
                        setFavInput(""),
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {favorites.map((f) => (
                    <Badge
                      key={f}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() =>
                        setFavorites(favorites.filter((x) => x !== f))
                      }
                    >
                      {f} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleComplete}
                disabled={saving || fat < 0}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {saving ? "Saving..." : "Get Started 🎉"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({
  mealPlan,
  profile,
  nutritionLog,
  onGenerate,
  onUseSample,
  generating,
  onViewRecipe,
}: {
  mealPlan: MealPlan | null;
  profile: UserProfile | null;
  nutritionLog: NutritionLog;
  onGenerate: () => void;
  onUseSample: () => void;
  generating: boolean;
  onViewRecipe: (meal: Meal) => void;
}) {
  const today: DayMeals | null = mealPlan?.days[0] ?? null;
  const calTarget = profile ? Number(profile.calorieTarget) : 2000;
  const calEaten = Number(nutritionLog.calories);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">{getGreeting()}! 🌿</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here\'s your meal plan for today.
        </p>
      </div>

      {!today ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-display text-xl font-bold mb-2">
              No meal plan yet
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Generate your personalized plan to get started.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={onGenerate} disabled={generating}>
                {generating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  "🧠 "
                )}
                {generating ? "Generating..." : "Generate AI Plan"}
              </Button>
              <Button variant="outline" onClick={onUseSample}>
                📋 Use Sample Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <CalorieDonut eaten={calEaten} target={calTarget} />
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={onGenerate} disabled={generating}>
                {generating ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : null}
                {generating ? "Generating..." : "🧠 Regenerate Plan"}
              </Button>
              <Button size="sm" variant="outline" onClick={onUseSample}>
                📋 Sample Plan
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MealCard
              meal={today.breakfast}
              label="Breakfast"
              onView={() => onViewRecipe(today.breakfast)}
            />
            <MealCard
              meal={today.lunch}
              label="Lunch"
              onView={() => onViewRecipe(today.lunch)}
            />
            <MealCard
              meal={today.dinner}
              label="Dinner"
              onView={() => onViewRecipe(today.dinner)}
            />
            {today.snacks.map((s) => (
              <MealCard
                key={s.name}
                meal={s}
                label="Snack"
                onView={() => onViewRecipe(s)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Weekly Planner ───────────────────────────────────────────────────────────
function WeeklyPlanner({
  mealPlan,
  onViewRecipe,
}: { mealPlan: MealPlan | null; onViewRecipe: (m: Meal) => void }) {
  const [selectedDay, setSelectedDay] = useState(0);
  if (!mealPlan) return <EmptyPlan />;
  const day = mealPlan.days[selectedDay];
  const mealTypeColor = [
    "bg-amber-400",
    "bg-emerald-400",
    "bg-violet-400",
    "bg-rose-400",
  ];
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold">Weekly Planner</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAY_SHORT.map((d, i) => (
          <button
            type="button"
            key={d}
            onClick={() => setSelectedDay(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedDay === i
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-4">{DAY_NAMES[selectedDay]}</h3>
        <div className="space-y-3">
          {[
            {
              label: "Breakfast",
              meal: day.breakfast,
              color: mealTypeColor[0],
            },
            { label: "Lunch", meal: day.lunch, color: mealTypeColor[1] },
            { label: "Dinner", meal: day.dinner, color: mealTypeColor[2] },
            ...day.snacks.map((s, i) => ({
              label: `Snack${day.snacks.length > 1 ? ` ${i + 1}` : ""}`,
              meal: s,
              color: mealTypeColor[3],
            })),
          ].map((item) => (
            <button
              type="button"
              key={item.label}
              className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-muted/40 transition-colors cursor-pointer"
              onClick={() => onViewRecipe(item.meal)}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-medium text-sm truncate">{item.meal.name}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {Number(item.meal.calories)} kcal
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Recipes ──────────────────────────────────────────────────────────────────
function Recipes({
  mealPlan,
  onViewRecipe,
}: { mealPlan: MealPlan | null; onViewRecipe: (m: Meal) => void }) {
  if (!mealPlan) return <EmptyPlan />;
  const seen = new Set<string>();
  const meals: Meal[] = [];
  for (const day of mealPlan.days) {
    for (const meal of [day.breakfast, day.lunch, day.dinner, ...day.snacks]) {
      if (!seen.has(meal.name)) {
        seen.add(meal.name);
        meals.push(meal);
      }
    }
  }
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold">Recipes</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {meals.map((meal) => (
          <Card
            key={meal.name}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onViewRecipe(meal)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">{meal.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {meal.description}
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  {Number(meal.calories)} kcal
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {Number(meal.prepTime)} min
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Grocery List ─────────────────────────────────────────────────────────────
function GroceryListPage({
  actor,
  mealPlan,
}: { actor: ReturnType<typeof useActor>["actor"]; mealPlan: MealPlan | null }) {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const load = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      setItems(await actor.getGroceryList());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (name: string) => {
    if (!actor) return;
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, checked: !i.checked } : i)),
    );
    await actor.toggleGroceryItemChecked(name);
  };

  const generateFromPlan = async () => {
    if (!actor || !mealPlan) return;
    setGenerating(true);
    try {
      const map = new Map<string, GroceryItem>();
      for (const day of mealPlan.days) {
        for (const meal of [
          day.breakfast,
          day.lunch,
          day.dinner,
          ...day.snacks,
        ]) {
          for (const ing of meal.ingredients) {
            const key = `${ing.name}|${ing.unit}`;
            if (map.has(key)) {
              const ex = map.get(key)!;
              map.set(key, { ...ex, quantity: ex.quantity + ing.quantity });
            } else {
              map.set(key, {
                name: ing.name,
                quantity: ing.quantity,
                unit: ing.unit,
                category: ing.category,
                checked: false,
              });
            }
          }
        }
      }
      for (const item of map.values()) {
        await actor.addGroceryItem(item);
      }
      await load();
      toast.success("Grocery list generated!");
    } catch {
      toast.error("Failed to generate list.");
    } finally {
      setGenerating(false);
    }
  };

  const grouped = items.reduce<Record<string, GroceryItem[]>>((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const checked = items.filter((i) => i.checked).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Grocery List</h2>
        <Button
          size="sm"
          onClick={generateFromPlan}
          disabled={generating || !mealPlan}
        >
          {generating ? (
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          ) : null}
          Generate from Plan
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex items-center gap-2">
          <Progress
            value={(checked / items.length) * 100}
            className="flex-1 h-2"
          />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {checked}/{items.length} checked
          </span>
        </div>
      )}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_item, i) => (
            <Skeleton key={_item || i} className="h-10 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-5xl mb-3">🛒</div>
            <p className="text-muted-foreground text-sm">
              No items yet. Generate from your meal plan.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat}>
              <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
                <span>{CATEGORY_ICONS[cat] ?? "📦"}</span> {cat}
              </h3>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/40 transition-colors"
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggle(item.name)}
                      id={`item-${item.name}`}
                    />
                    <label
                      htmlFor={`item-${item.name}`}
                      className={`flex-1 text-sm cursor-pointer ${item.checked ? "line-through text-muted-foreground" : ""}`}
                    >
                      {item.name}
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {Number(item.quantity)} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Nutrition Tracker ────────────────────────────────────────────────────────
function NutritionTracker({
  actor,
  profile,
  mealPlan,
}: {
  actor: ReturnType<typeof useActor>["actor"];
  profile: UserProfile | null;
  mealPlan: MealPlan | null;
}) {
  const [log, setLog] = useState<NutritionLog>({
    calories: BigInt(0),
    protein: BigInt(0),
    carbs: BigInt(0),
    fat: BigInt(0),
  });
  const [loading, setLoading] = useState(true);
  const [loggedMeals, setLoggedMeals] = useState<string[]>([]);
  const [logging, setLogging] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  const calTarget = profile ? Number(profile.calorieTarget) : 2000;
  const macroRatio = profile?.macroRatio;
  const proteinTarget = macroRatio
    ? Math.round((calTarget * Number(macroRatio.protein)) / 100 / 4)
    : 150;
  const carbsTarget = macroRatio
    ? Math.round((calTarget * Number(macroRatio.carbs)) / 100 / 4)
    : 225;
  const fatTarget = macroRatio
    ? Math.round((calTarget * Number(macroRatio.fat)) / 100 / 9)
    : 55;

  useEffect(() => {
    if (!actor) return;
    actor
      .getNutritionLog()
      .then(setLog)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [actor]);

  const allMeals: { label: string; meal: Meal }[] = [];
  if (mealPlan) {
    const day = mealPlan.days[0];
    allMeals.push(
      { label: "Breakfast", meal: day.breakfast },
      { label: "Lunch", meal: day.lunch },
      { label: "Dinner", meal: day.dinner },
      ...day.snacks.map((s, i) => ({ label: `Snack ${i + 1}`, meal: s })),
    );
  }

  const logMeal = async (meal: Meal) => {
    if (!actor) return;
    setLogging(true);
    try {
      const newLog: NutritionLog = {
        calories: log.calories + meal.calories,
        protein: log.protein + meal.protein,
        carbs: log.carbs + meal.carbs,
        fat: log.fat + meal.fat,
      };
      await actor.logNutrition(newLog);
      setLog(newLog);
      setLoggedMeals((prev) => [...prev, meal.name]);
      setShowLogModal(false);
      toast.success(`Logged ${meal.name}`);
    } catch {
      toast.error("Failed to log meal.");
    } finally {
      setLogging(false);
    }
  };

  const macros = [
    {
      name: "Protein",
      val: Number(log.protein),
      target: proteinTarget,
      color: "bg-blue-500",
    },
    {
      name: "Carbs",
      val: Number(log.carbs),
      target: carbsTarget,
      color: "bg-amber-500",
    },
    {
      name: "Fat",
      val: Number(log.fat),
      target: fatTarget,
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Nutrition</h2>
        <Button
          size="sm"
          onClick={() => setShowLogModal(true)}
          disabled={!mealPlan}
        >
          Log a Meal
        </Button>
      </div>
      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-display font-bold">
                  {Number(log.calories)}
                </div>
                <div className="text-sm text-muted-foreground">
                  / {calTarget} kcal today
                </div>
                <Progress
                  value={Math.min(
                    (Number(log.calories) / calTarget) * 100,
                    100,
                  )}
                  className="mt-3 h-2"
                />
              </div>
              <div className="space-y-3 mt-4">
                {macros.map((m) => (
                  <div key={m.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-muted-foreground">
                        {m.val}g / {m.target}g
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${m.color}`}
                        style={{
                          width: `${Math.min((m.val / m.target) * 100, 100)}%`,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {loggedMeals.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-3">Logged today</h3>
              <div className="space-y-2">
                {loggedMeals.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 text-sm py-1.5 px-3 bg-secondary rounded-lg"
                  >
                    <span className="text-green-600">✓</span> {name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <Dialog open={showLogModal} onOpenChange={setShowLogModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log a Meal</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {allMeals.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No meal plan loaded.
              </p>
            ) : (
              allMeals.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium">{item.meal.name}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => logMeal(item.meal)}
                    disabled={logging}
                  >
                    {logging ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      "Log"
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Profile Settings ─────────────────────────────────────────────────────────
function ProfileSettings({
  actor,
  profile,
  onSave,
}: {
  actor: ReturnType<typeof useActor>["actor"];
  profile: UserProfile | null;
  onSave: (p: UserProfile) => void;
}) {
  const [dietType, setDietType] = useState<DietType>(
    profile?.dietType ?? DietType.omnivore,
  );
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(
    profile?.healthGoal ?? HealthGoal.eatHealthier,
  );
  const [calories, setCalories] = useState(
    profile ? Number(profile.calorieTarget) : 2000,
  );
  const [protein, setProtein] = useState(
    profile ? Number(profile.macroRatio.protein) : 30,
  );
  const [carbs, setCarbs] = useState(
    profile ? Number(profile.macroRatio.carbs) : 45,
  );
  const [fat, setFat] = useState(profile ? Number(profile.macroRatio.fat) : 25);
  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState<string[]>(
    profile?.allergies ?? [],
  );
  const [favInput, setFavInput] = useState("");
  const [favorites, setFavorites] = useState<string[]>(
    profile?.favoriteFoods ?? [],
  );
  const [saving, setSaving] = useState(false);

  const addChip = (
    val: string,
    list: string[],
    setter: (v: string[]) => void,
    clear: () => void,
  ) => {
    const trimmed = val.trim();
    if (trimmed && !list.includes(trimmed)) setter([...list, trimmed]);
    clear();
  };

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      const updated: UserProfile = {
        dietType,
        healthGoal,
        calorieTarget: BigInt(calories),
        macroRatio: {
          protein: BigInt(protein),
          carbs: BigInt(carbs),
          fat: BigInt(fat),
        },
        allergies,
        favoriteFoods: favorites,
      };
      await actor.saveCallerUserProfile(updated);
      onSave(updated);
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold">Profile Settings</h2>
      <div className="space-y-5">
        <div>
          <Label className="text-sm font-semibold mb-3 block">Diet Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {DIET_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setDietType(opt.value)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm transition-all ${
                  dietType === opt.value
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span>{opt.emoji}</span> {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Health Goal
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {GOAL_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setHealthGoal(opt.value)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm transition-all ${
                  healthGoal === opt.value
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span>{opt.emoji}</span> {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold">
            Daily Calories: {calories} kcal
          </Label>
          <Slider
            min={1200}
            max={3500}
            step={50}
            value={[calories]}
            onValueChange={([v]) => setCalories(v)}
            className="mt-3"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Macros</Label>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between text-xs">
              <span>Protein</span>
              <span>{protein}%</span>
            </div>
            <Slider
              min={10}
              max={60}
              value={[protein]}
              onValueChange={([v]) => setProtein(v)}
            />
            <div className="flex justify-between text-xs">
              <span>Carbs</span>
              <span>{carbs}%</span>
            </div>
            <Slider
              min={10}
              max={70}
              value={[carbs]}
              onValueChange={([v]) => setCarbs(v)}
            />
            <div className="flex justify-between text-xs">
              <span>Fat</span>
              <span>{fat}%</span>
            </div>
            <Slider
              min={5}
              max={60}
              value={[fat]}
              onValueChange={([v]) => setFat(v)}
            />
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold">Allergies</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                addChip(allergyInput, allergies, setAllergies, () =>
                  setAllergyInput(""),
                )
              }
              placeholder="Add allergy"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addChip(allergyInput, allergies, setAllergies, () =>
                  setAllergyInput(""),
                )
              }
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {allergies.map((a) => (
              <Badge
                key={a}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setAllergies(allergies.filter((x) => x !== a))}
              >
                {a} ×
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold">Favorite Foods</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={favInput}
              onChange={(e) => setFavInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                addChip(favInput, favorites, setFavorites, () =>
                  setFavInput(""),
                )
              }
              placeholder="Add food"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addChip(favInput, favorites, setFavorites, () =>
                  setFavInput(""),
                )
              }
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {favorites.map((f) => (
              <Badge
                key={f}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setFavorites(favorites.filter((x) => x !== f))}
              >
                {f} ×
              </Badge>
            ))}
          </div>
        </div>
        <Button className="w-full" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}

function EmptyPlan() {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="text-5xl mb-3">🍽️</div>
        <p className="text-muted-foreground text-sm">
          No meal plan yet. Go to Dashboard to generate one.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { identity, clear } = useInternetIdentity();
  const { actor, isFetching: actorLoading } = useActor();
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [nutritionLog, setNutritionLog] = useState<NutritionLog>({
    calories: BigInt(0),
    protein: BigInt(0),
    carbs: BigInt(0),
    fat: BigInt(0),
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [recipeModal, setRecipeModal] = useState<Meal | null>(null);

  // Load data
  useEffect(() => {
    if (!actor || !identity) return;
    setProfileLoading(true);
    Promise.all([
      actor.getCallerUserProfile(),
      actor.getMealPlan(),
      actor.getNutritionLog(),
    ])
      .then(([p, mp, nl]) => {
        setProfile(p);
        setMealPlan(mp);
        setNutritionLog(nl);
      })
      .catch(() => {})
      .finally(() => setProfileLoading(false));
  }, [actor, identity]);

  const handleGenerate = async () => {
    if (!actor) return;
    setGenerating(true);
    try {
      await actor.generateMealPlan("", []);
      const mp = await actor.getMealPlan();
      setMealPlan(mp);
      toast.success("Meal plan generated!");
    } catch {
      toast.error("Generation failed. Using sample plan instead.");
      await handleUseSample();
    } finally {
      setGenerating(false);
    }
  };

  const handleUseSample = async () => {
    if (!actor) return;
    try {
      await actor.saveMealPlan(SAMPLE_MEAL_PLAN);
      setMealPlan(SAMPLE_MEAL_PLAN);
      toast.success("Sample meal plan loaded!");
    } catch {
      toast.error("Failed to load sample plan.");
    }
  };

  if (!identity) return <LoginScreen />;
  if (actorLoading || profileLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Loading your plan...</p>
        </div>
      </div>
    );
  if (!profile)
    return (
      <OnboardingWizard
        onComplete={() => {
          actor?.getCallerUserProfile().then(setProfile);
          actor?.getMealPlan().then(setMealPlan);
        }}
      />
    );

  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Today",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "weekly",
      label: "Weekly Plan",
      icon: <CalendarDays className="w-5 h-5" />,
    },
    { id: "recipes", label: "Recipes", icon: <BookOpen className="w-5 h-5" /> },
    {
      id: "grocery",
      label: "Grocery List",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      id: "nutrition",
      label: "Nutrition",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-sidebar-foreground text-sm">
              AI Meal Planner
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              Eat Smart, Live Better
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => {
              setPage(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              page === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button
          type="button"
          onClick={clear}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={() => setSidebarOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
          <aside className="relative w-72 bg-sidebar flex flex-col z-10">
            <button
              type="button"
              className="absolute top-4 right-4 text-sidebar-foreground/70"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b bg-card">
          <button type="button" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-bold">
            {navItems.find((n) => n.id === page)?.label}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-2xl mx-auto w-full">
          {page === "dashboard" && (
            <Dashboard
              mealPlan={mealPlan}
              profile={profile}
              nutritionLog={nutritionLog}
              onGenerate={handleGenerate}
              onUseSample={handleUseSample}
              generating={generating}
              onViewRecipe={setRecipeModal}
            />
          )}
          {page === "weekly" && (
            <WeeklyPlanner mealPlan={mealPlan} onViewRecipe={setRecipeModal} />
          )}
          {page === "recipes" && (
            <Recipes mealPlan={mealPlan} onViewRecipe={setRecipeModal} />
          )}
          {page === "grocery" && (
            <GroceryListPage actor={actor} mealPlan={mealPlan} />
          )}
          {page === "nutrition" && (
            <NutritionTracker
              actor={actor}
              profile={profile}
              mealPlan={mealPlan}
            />
          )}
          {page === "profile" && (
            <ProfileSettings
              actor={actor}
              profile={profile}
              onSave={setProfile}
            />
          )}
        </div>
      </main>

      <RecipeDialog
        meal={recipeModal}
        open={!!recipeModal}
        onClose={() => setRecipeModal(null)}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
}
