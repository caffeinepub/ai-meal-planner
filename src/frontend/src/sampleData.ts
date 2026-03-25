import type { MealPlan } from "./backend";

export const SAMPLE_MEAL_PLAN: MealPlan = {
  days: [
    {
      breakfast: {
        name: "Greek Yogurt Parfait",
        description:
          "Creamy Greek yogurt layered with fresh berries, granola, and a drizzle of honey. Rich in protein and probiotics to kickstart your morning.",
        calories: BigInt(380),
        protein: BigInt(22),
        carbs: BigInt(48),
        fat: BigInt(8),
        prepTime: BigInt(10),
        ingredients: [
          {
            name: "Greek yogurt",
            quantity: BigInt(200),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Mixed berries",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Granola",
            quantity: BigInt(40),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Honey",
            quantity: BigInt(1),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      lunch: {
        name: "Quinoa Buddha Bowl",
        description:
          "Nourishing bowl with fluffy quinoa, roasted sweet potato, chickpeas, avocado, and tahini dressing. A complete meal packed with plant-based protein.",
        calories: BigInt(520),
        protein: BigInt(18),
        carbs: BigInt(68),
        fat: BigInt(16),
        prepTime: BigInt(25),
        ingredients: [
          {
            name: "Quinoa",
            quantity: BigInt(80),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Sweet potato",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Chickpeas",
            quantity: BigInt(120),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Avocado",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Tahini",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
          {
            name: "Lemon",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
        ],
      },
      dinner: {
        name: "Grilled Salmon with Asparagus",
        description:
          "Pan-seared Atlantic salmon fillet with roasted asparagus and lemon-dill sauce. High in omega-3 fatty acids and lean protein.",
        calories: BigInt(580),
        protein: BigInt(46),
        carbs: BigInt(12),
        fat: BigInt(32),
        prepTime: BigInt(25),
        ingredients: [
          {
            name: "Salmon fillet",
            quantity: BigInt(200),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Asparagus",
            quantity: BigInt(200),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Lemon",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Fresh dill",
            quantity: BigInt(10),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Olive oil",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      snacks: [
        {
          name: "Apple with Almond Butter",
          description:
            "Crisp apple slices paired with natural almond butter for a satisfying mix of fiber and healthy fats.",
          calories: BigInt(220),
          protein: BigInt(6),
          carbs: BigInt(28),
          fat: BigInt(10),
          prepTime: BigInt(3),
          ingredients: [
            {
              name: "Apple",
              quantity: BigInt(1),
              unit: "whole",
              category: "Produce",
            },
            {
              name: "Almond butter",
              quantity: BigInt(2),
              unit: "tbsp",
              category: "Pantry",
            },
          ],
        },
      ],
    },
    {
      breakfast: {
        name: "Avocado Toast with Poached Eggs",
        description:
          "Sourdough toast topped with smashed avocado, two perfectly poached eggs, cherry tomatoes, and a sprinkle of chili flakes.",
        calories: BigInt(440),
        protein: BigInt(20),
        carbs: BigInt(42),
        fat: BigInt(20),
        prepTime: BigInt(15),
        ingredients: [
          {
            name: "Sourdough bread",
            quantity: BigInt(2),
            unit: "slices",
            category: "Grains",
          },
          {
            name: "Avocado",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Eggs",
            quantity: BigInt(2),
            unit: "whole",
            category: "Proteins",
          },
          {
            name: "Cherry tomatoes",
            quantity: BigInt(80),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Chili flakes",
            quantity: BigInt(1),
            unit: "tsp",
            category: "Pantry",
          },
        ],
      },
      lunch: {
        name: "Chicken Caesar Salad",
        description:
          "Classic Caesar salad with grilled chicken breast, crisp romaine, house-made dressing, and whole grain croutons.",
        calories: BigInt(480),
        protein: BigInt(38),
        carbs: BigInt(24),
        fat: BigInt(22),
        prepTime: BigInt(20),
        ingredients: [
          {
            name: "Chicken breast",
            quantity: BigInt(180),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Romaine lettuce",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Parmesan",
            quantity: BigInt(30),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Whole grain croutons",
            quantity: BigInt(30),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Caesar dressing",
            quantity: BigInt(3),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      dinner: {
        name: "Beef & Vegetable Stir Fry",
        description:
          "Tender beef strips with colorful bell peppers, broccoli, and snap peas in a savory ginger-soy sauce over brown rice.",
        calories: BigInt(620),
        protein: BigInt(40),
        carbs: BigInt(58),
        fat: BigInt(18),
        prepTime: BigInt(25),
        ingredients: [
          {
            name: "Beef sirloin",
            quantity: BigInt(200),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Brown rice",
            quantity: BigInt(80),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Bell peppers",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Broccoli",
            quantity: BigInt(120),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Snap peas",
            quantity: BigInt(80),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Soy sauce",
            quantity: BigInt(3),
            unit: "tbsp",
            category: "Pantry",
          },
          {
            name: "Fresh ginger",
            quantity: BigInt(10),
            unit: "g",
            category: "Produce",
          },
        ],
      },
      snacks: [
        {
          name: "Hummus & Veggie Sticks",
          description:
            "Creamy hummus with fresh cucumber, carrot, and celery sticks. A fiber-rich, satisfying snack.",
          calories: BigInt(190),
          protein: BigInt(8),
          carbs: BigInt(22),
          fat: BigInt(8),
          prepTime: BigInt(5),
          ingredients: [
            {
              name: "Hummus",
              quantity: BigInt(80),
              unit: "g",
              category: "Pantry",
            },
            {
              name: "Cucumber",
              quantity: BigInt(100),
              unit: "g",
              category: "Produce",
            },
            {
              name: "Carrots",
              quantity: BigInt(80),
              unit: "g",
              category: "Produce",
            },
            {
              name: "Celery",
              quantity: BigInt(60),
              unit: "g",
              category: "Produce",
            },
          ],
        },
      ],
    },
    {
      breakfast: {
        name: "Overnight Oats with Banana",
        description:
          "Creamy oats soaked overnight with chia seeds, topped with sliced banana, walnuts, and maple syrup.",
        calories: BigInt(420),
        protein: BigInt(14),
        carbs: BigInt(62),
        fat: BigInt(12),
        prepTime: BigInt(5),
        ingredients: [
          {
            name: "Rolled oats",
            quantity: BigInt(80),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Chia seeds",
            quantity: BigInt(15),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Banana",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Walnuts",
            quantity: BigInt(20),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Almond milk",
            quantity: BigInt(250),
            unit: "ml",
            category: "Dairy",
          },
          {
            name: "Maple syrup",
            quantity: BigInt(1),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      lunch: {
        name: "Turkey & Avocado Wrap",
        description:
          "Whole wheat wrap with sliced turkey, creamy avocado, mixed greens, tomato, and a light mustard-honey spread.",
        calories: BigInt(490),
        protein: BigInt(32),
        carbs: BigInt(46),
        fat: BigInt(16),
        prepTime: BigInt(10),
        ingredients: [
          {
            name: "Whole wheat tortilla",
            quantity: BigInt(1),
            unit: "whole",
            category: "Grains",
          },
          {
            name: "Turkey slices",
            quantity: BigInt(100),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Avocado",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Mixed greens",
            quantity: BigInt(50),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Tomato",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Dijon mustard",
            quantity: BigInt(1),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      dinner: {
        name: "Lemon Herb Chicken Thighs",
        description:
          "Juicy baked chicken thighs marinated in lemon, garlic, and fresh herbs, served with roasted baby potatoes and green beans.",
        calories: BigInt(560),
        protein: BigInt(42),
        carbs: BigInt(38),
        fat: BigInt(22),
        prepTime: BigInt(40),
        ingredients: [
          {
            name: "Chicken thighs",
            quantity: BigInt(250),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Baby potatoes",
            quantity: BigInt(200),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Green beans",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Lemon",
            quantity: BigInt(2),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Garlic",
            quantity: BigInt(4),
            unit: "cloves",
            category: "Produce",
          },
          {
            name: "Fresh rosemary",
            quantity: BigInt(5),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Olive oil",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      snacks: [
        {
          name: "Mixed Nuts & Dark Chocolate",
          description:
            "A handful of mixed nuts with a few squares of dark chocolate for antioxidants and healthy fats.",
          calories: BigInt(260),
          protein: BigInt(7),
          carbs: BigInt(18),
          fat: BigInt(18),
          prepTime: BigInt(1),
          ingredients: [
            {
              name: "Mixed nuts",
              quantity: BigInt(30),
              unit: "g",
              category: "Pantry",
            },
            {
              name: "Dark chocolate 70%",
              quantity: BigInt(20),
              unit: "g",
              category: "Pantry",
            },
          ],
        },
      ],
    },
    {
      breakfast: {
        name: "Spinach & Feta Omelette",
        description:
          "Fluffy three-egg omelette filled with sautéed spinach, sun-dried tomatoes, and crumbled feta cheese.",
        calories: BigInt(360),
        protein: BigInt(28),
        carbs: BigInt(6),
        fat: BigInt(24),
        prepTime: BigInt(12),
        ingredients: [
          {
            name: "Eggs",
            quantity: BigInt(3),
            unit: "whole",
            category: "Proteins",
          },
          {
            name: "Spinach",
            quantity: BigInt(80),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Feta cheese",
            quantity: BigInt(40),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Sun-dried tomatoes",
            quantity: BigInt(30),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Olive oil",
            quantity: BigInt(1),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      lunch: {
        name: "Lentil Soup with Crusty Bread",
        description:
          "Hearty red lentil soup with cumin, turmeric, and fresh lemon, served with a slice of whole grain bread.",
        calories: BigInt(460),
        protein: BigInt(22),
        carbs: BigInt(68),
        fat: BigInt(8),
        prepTime: BigInt(30),
        ingredients: [
          {
            name: "Red lentils",
            quantity: BigInt(120),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Onion",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Carrot",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Cumin",
            quantity: BigInt(2),
            unit: "tsp",
            category: "Pantry",
          },
          {
            name: "Turmeric",
            quantity: BigInt(1),
            unit: "tsp",
            category: "Pantry",
          },
          {
            name: "Whole grain bread",
            quantity: BigInt(1),
            unit: "slice",
            category: "Grains",
          },
        ],
      },
      dinner: {
        name: "Shrimp Tacos with Mango Salsa",
        description:
          "Smoky grilled shrimp in corn tortillas topped with fresh mango salsa, cabbage slaw, and lime crema.",
        calories: BigInt(540),
        protein: BigInt(34),
        carbs: BigInt(52),
        fat: BigInt(16),
        prepTime: BigInt(20),
        ingredients: [
          {
            name: "Shrimp",
            quantity: BigInt(200),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Corn tortillas",
            quantity: BigInt(3),
            unit: "whole",
            category: "Grains",
          },
          {
            name: "Mango",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Red cabbage",
            quantity: BigInt(80),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Lime",
            quantity: BigInt(2),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Sour cream",
            quantity: BigInt(40),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Cilantro",
            quantity: BigInt(10),
            unit: "g",
            category: "Produce",
          },
        ],
      },
      snacks: [
        {
          name: "Edamame with Sea Salt",
          description:
            "Steamed edamame beans lightly sprinkled with sea salt. A protein-packed plant-based snack.",
          calories: BigInt(150),
          protein: BigInt(12),
          carbs: BigInt(10),
          fat: BigInt(5),
          prepTime: BigInt(5),
          ingredients: [
            {
              name: "Edamame",
              quantity: BigInt(150),
              unit: "g",
              category: "Proteins",
            },
            {
              name: "Sea salt",
              quantity: BigInt(1),
              unit: "tsp",
              category: "Pantry",
            },
          ],
        },
      ],
    },
    {
      breakfast: {
        name: "Smoothie Bowl",
        description:
          "Thick acai and banana smoothie bowl topped with sliced kiwi, coconut flakes, hemp seeds, and crunchy granola.",
        calories: BigInt(410),
        protein: BigInt(12),
        carbs: BigInt(58),
        fat: BigInt(14),
        prepTime: BigInt(10),
        ingredients: [
          {
            name: "Frozen banana",
            quantity: BigInt(2),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Acai puree",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Kiwi",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Coconut flakes",
            quantity: BigInt(10),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Hemp seeds",
            quantity: BigInt(15),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Granola",
            quantity: BigInt(30),
            unit: "g",
            category: "Grains",
          },
        ],
      },
      lunch: {
        name: "Mediterranean Tuna Salad",
        description:
          "Chunk tuna with olives, cucumber, cherry tomatoes, red onion, capers, and a light olive oil dressing.",
        calories: BigInt(380),
        protein: BigInt(34),
        carbs: BigInt(16),
        fat: BigInt(18),
        prepTime: BigInt(10),
        ingredients: [
          {
            name: "Canned tuna",
            quantity: BigInt(160),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Kalamata olives",
            quantity: BigInt(40),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Cucumber",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Cherry tomatoes",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Red onion",
            quantity: BigInt(40),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Capers",
            quantity: BigInt(15),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Olive oil",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      dinner: {
        name: "Pasta Primavera",
        description:
          "Whole wheat pasta with seasonal vegetables in a light garlic-basil sauce with cherry tomatoes and a sprinkle of Parmesan.",
        calories: BigInt(560),
        protein: BigInt(20),
        carbs: BigInt(78),
        fat: BigInt(14),
        prepTime: BigInt(25),
        ingredients: [
          {
            name: "Whole wheat pasta",
            quantity: BigInt(100),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Zucchini",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Bell peppers",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Cherry tomatoes",
            quantity: BigInt(120),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Garlic",
            quantity: BigInt(3),
            unit: "cloves",
            category: "Produce",
          },
          {
            name: "Fresh basil",
            quantity: BigInt(10),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Parmesan",
            quantity: BigInt(20),
            unit: "g",
            category: "Dairy",
          },
        ],
      },
      snacks: [
        {
          name: "Cottage Cheese with Pineapple",
          description:
            "Low-fat cottage cheese topped with fresh pineapple chunks. High protein, naturally sweet.",
          calories: BigInt(200),
          protein: BigInt(18),
          carbs: BigInt(22),
          fat: BigInt(3),
          prepTime: BigInt(3),
          ingredients: [
            {
              name: "Cottage cheese",
              quantity: BigInt(200),
              unit: "g",
              category: "Dairy",
            },
            {
              name: "Pineapple",
              quantity: BigInt(100),
              unit: "g",
              category: "Produce",
            },
          ],
        },
      ],
    },
    {
      breakfast: {
        name: "Whole Grain Pancakes",
        description:
          "Fluffy whole grain pancakes served with fresh strawberries, a dollop of Greek yogurt, and maple syrup.",
        calories: BigInt(480),
        protein: BigInt(18),
        carbs: BigInt(70),
        fat: BigInt(12),
        prepTime: BigInt(20),
        ingredients: [
          {
            name: "Whole wheat flour",
            quantity: BigInt(100),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Eggs",
            quantity: BigInt(2),
            unit: "whole",
            category: "Proteins",
          },
          {
            name: "Strawberries",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Greek yogurt",
            quantity: BigInt(60),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Maple syrup",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
          {
            name: "Baking powder",
            quantity: BigInt(1),
            unit: "tsp",
            category: "Pantry",
          },
        ],
      },
      lunch: {
        name: "Black Bean & Sweet Potato Burrito Bowl",
        description:
          "Brown rice topped with spiced black beans, roasted sweet potato, corn salsa, guacamole, and pico de gallo.",
        calories: BigInt(580),
        protein: BigInt(20),
        carbs: BigInt(82),
        fat: BigInt(16),
        prepTime: BigInt(30),
        ingredients: [
          {
            name: "Brown rice",
            quantity: BigInt(80),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Black beans",
            quantity: BigInt(150),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Sweet potato",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Corn",
            quantity: BigInt(80),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Avocado",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Lime",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Cilantro",
            quantity: BigInt(10),
            unit: "g",
            category: "Produce",
          },
        ],
      },
      dinner: {
        name: "Baked Cod with Roasted Vegetables",
        description:
          "Flaky cod fillet with lemon-herb crust, served alongside a medley of roasted zucchini, cherry tomatoes, and bell peppers.",
        calories: BigInt(440),
        protein: BigInt(42),
        carbs: BigInt(22),
        fat: BigInt(16),
        prepTime: BigInt(30),
        ingredients: [
          {
            name: "Cod fillet",
            quantity: BigInt(200),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Zucchini",
            quantity: BigInt(120),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Cherry tomatoes",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Bell peppers",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Breadcrumbs",
            quantity: BigInt(30),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Lemon",
            quantity: BigInt(1),
            unit: "whole",
            category: "Produce",
          },
          {
            name: "Olive oil",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      snacks: [
        {
          name: "Rice Cakes with Peanut Butter",
          description:
            "Light rice cakes spread with natural peanut butter and topped with banana slices.",
          calories: BigInt(240),
          protein: BigInt(8),
          carbs: BigInt(32),
          fat: BigInt(10),
          prepTime: BigInt(3),
          ingredients: [
            {
              name: "Rice cakes",
              quantity: BigInt(2),
              unit: "whole",
              category: "Grains",
            },
            {
              name: "Peanut butter",
              quantity: BigInt(2),
              unit: "tbsp",
              category: "Pantry",
            },
            {
              name: "Banana",
              quantity: BigInt(1),
              unit: "whole",
              category: "Produce",
            },
          ],
        },
      ],
    },
    {
      breakfast: {
        name: "Berry Protein Smoothie",
        description:
          "Blended smoothie with mixed berries, vanilla protein powder, spinach, almond milk, and a tablespoon of flaxseeds.",
        calories: BigInt(340),
        protein: BigInt(30),
        carbs: BigInt(36),
        fat: BigInt(8),
        prepTime: BigInt(5),
        ingredients: [
          {
            name: "Mixed berries",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Protein powder",
            quantity: BigInt(30),
            unit: "g",
            category: "Pantry",
          },
          {
            name: "Spinach",
            quantity: BigInt(40),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Almond milk",
            quantity: BigInt(300),
            unit: "ml",
            category: "Dairy",
          },
          {
            name: "Flaxseeds",
            quantity: BigInt(1),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      lunch: {
        name: "Grilled Veggie & Halloumi Salad",
        description:
          "Grilled halloumi cheese over mixed greens with grilled zucchini, eggplant, red onion, and balsamic glaze.",
        calories: BigInt(500),
        protein: BigInt(24),
        carbs: BigInt(28),
        fat: BigInt(30),
        prepTime: BigInt(20),
        ingredients: [
          {
            name: "Halloumi",
            quantity: BigInt(120),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Mixed greens",
            quantity: BigInt(80),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Zucchini",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Eggplant",
            quantity: BigInt(100),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Red onion",
            quantity: BigInt(50),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Balsamic vinegar",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
          {
            name: "Olive oil",
            quantity: BigInt(2),
            unit: "tbsp",
            category: "Pantry",
          },
        ],
      },
      dinner: {
        name: "Pesto Chicken with Roasted Tomatoes",
        description:
          "Oven-baked chicken breast coated in basil pesto, served with burst cherry tomatoes and creamy polenta.",
        calories: BigInt(600),
        protein: BigInt(48),
        carbs: BigInt(40),
        fat: BigInt(24),
        prepTime: BigInt(35),
        ingredients: [
          {
            name: "Chicken breast",
            quantity: BigInt(200),
            unit: "g",
            category: "Proteins",
          },
          {
            name: "Basil pesto",
            quantity: BigInt(3),
            unit: "tbsp",
            category: "Pantry",
          },
          {
            name: "Cherry tomatoes",
            quantity: BigInt(150),
            unit: "g",
            category: "Produce",
          },
          {
            name: "Polenta",
            quantity: BigInt(80),
            unit: "g",
            category: "Grains",
          },
          {
            name: "Parmesan",
            quantity: BigInt(20),
            unit: "g",
            category: "Dairy",
          },
          {
            name: "Fresh basil",
            quantity: BigInt(10),
            unit: "g",
            category: "Produce",
          },
        ],
      },
      snacks: [
        {
          name: "Medjool Dates with Cashews",
          description:
            "Naturally sweet Medjool dates stuffed with whole cashews — a perfect energy-boosting treat.",
          calories: BigInt(230),
          protein: BigInt(4),
          carbs: BigInt(38),
          fat: BigInt(8),
          prepTime: BigInt(2),
          ingredients: [
            {
              name: "Medjool dates",
              quantity: BigInt(3),
              unit: "whole",
              category: "Produce",
            },
            {
              name: "Cashews",
              quantity: BigInt(20),
              unit: "g",
              category: "Pantry",
            },
          ],
        },
      ],
    },
  ],
};
