<?php
$pageTitle = 'Товар - SKLADONLINE';
require_once 'includes/header.php';

// Get product ID from URL
$productId = $_GET['id'] ?? null;

// In a real application, you would fetch the product from the database
// For now, we'll use sample data
$product = [
    'id' => $productId,
    'name' => 'Валіза SAMSONITE S\'Cure Spinner 55cm',
    'price' => 8999,
    'oldPrice' => 9999,
    'images' => [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
    ],
    'category' => 'Валізи',
    'description' => 'Легка та міцна валіза з полікарбонату з системою 4 коліс для максимального комфорту під час подорожі. Оснащена TSA замком для безпеки ваших речей.',
    'features' => [
        'Матеріал: полікарбонат',
        'Об\'єм: 34 л',
        'Розмір: 55x40x20 см',
        'Вага: 2.9 кг',
        'Колір: чорний',
        'Гарантія: 5 років'
    ],
    'specifications' => [
        'brand' => 'Samsonite',
        'model' => 'S\'Cure',
        'type' => 'Spinner',
        'material' => 'Полікарбонат',
        'size' => '55x40x20 см',
        'volume' => '34 л',
        'weight' => '2.9 кг',
        'warranty' => '5 років'
    ]
];

// Similar products
$similarProducts = [
    [
        'id' => 2,
        'name' => 'Валіза DELSEY Chatelet Air 67cm',
        'price' => 7999,
        'image' => '/path/to/similar1.jpg',
        'category' => 'Валізи'
    ],
    // Add more similar products
];

// Breadcrumb data
$breadcrumbs = [
    ['label' => 'Головна', 'href' => '/'],
    ['label' => 'Каталог', 'href' => '/catalog.php'],
    ['label' => $product['category'], 'href' => '/catalog.php?category=valizy'],
    ['label' => $product['name']]
];
?>

<div class="min-h-screen bg-white py-8">
    <div class="container mx-auto px-4">
        <!-- Breadcrumbs -->
        <nav class="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <?php foreach ($breadcrumbs as $index => $item): ?>
                <?php if ($index > 0): ?>
                    <span class="text-gray-400">/</span>
                <?php endif; ?>
                
                <?php if (isset($item['href'])): ?>
                    <a href="<?php echo htmlspecialchars($item['href']); ?>" 
                       class="hover:text-foreground transition-colors">
                        <?php echo htmlspecialchars($item['label']); ?>
                    </a>
                <?php else: ?>
                    <span class="text-foreground font-medium">
                        <?php echo htmlspecialchars($item['label']); ?>
                    </span>
                <?php endif; ?>
            <?php endforeach; ?>
        </nav>

        <!-- Product Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Product Gallery -->
            <div>
                <div class="aspect-square bg-gray-100 rounded-lg mb-4">
                    <img src="<?php echo htmlspecialchars($product['images'][0]); ?>" 
                         alt="<?php echo htmlspecialchars($product['name']); ?>"
                         class="w-full h-full object-contain">
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <?php foreach ($product['images'] as $image): ?>
                        <button class="aspect-square bg-gray-100 rounded-lg p-2">
                            <img src="<?php echo htmlspecialchars($image); ?>" 
                                 alt="<?php echo htmlspecialchars($product['name']); ?>"
                                 class="w-full h-full object-contain">
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Product Info -->
            <div>
                <h1 class="text-3xl font-bold mb-4">
                    <?php echo htmlspecialchars($product['name']); ?>
                </h1>

                <div class="flex items-end gap-4 mb-6">
                    <div class="text-3xl font-bold">
                        <?php echo number_format($product['price'], 0, '.', ' '); ?> грн
                    </div>
                    <?php if (isset($product['oldPrice'])): ?>
                        <div class="text-lg text-gray-500 line-through">
                            <?php echo number_format($product['oldPrice'], 0, '.', ' '); ?> грн
                        </div>
                    <?php endif; ?>
                </div>

                <div class="space-y-6">
                    <div class="flex gap-4">
                        <button class="flex-1 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
                                onclick="addToCart(<?php echo $product['id']; ?>)">
                            Додати в кошик
                        </button>
                        <button class="p-3 border rounded-md hover:bg-gray-50"
                                onclick="addToFavorites(<?php echo $product['id']; ?>)">
                            <img src="/php-templates/assets/icons/icon-heart.svg" alt="У обране" class="w-6 h-6">
                        </button>
                        <button class="p-3 border rounded-md hover:bg-gray-50"
                                onclick="addToComparison(<?php echo $product['id']; ?>)">
                            <img src="/php-templates/assets/icons/icon-compare.svg" alt="Порівняти" class="w-6 h-6">
                        </button>
                    </div>

                    <!-- Product Tabs -->
                    <div class="border-t pt-8">
                        <div class="border-b">
                            <div class="flex space-x-8">
                                <button class="px-4 py-2 border-b-2 border-primary text-primary"
                                        onclick="switchTab('description')">
                                    Опис
                                </button>
                                <button class="px-4 py-2 text-gray-500 hover:text-gray-900"
                                        onclick="switchTab('specifications')">
                                    Характеристики
                                </button>
                            </div>
                        </div>

                        <div id="description" class="py-6">
                            <div class="space-y-4">
                                <p class="text-gray-600 leading-relaxed">
                                    <?php echo htmlspecialchars($product['description']); ?>
                                </p>
                                
                                <div>
                                    <h3 class="font-semibold mb-3">Особливості:</h3>
                                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <?php foreach ($product['features'] as $feature): ?>
                                            <li class="flex items-center space-x-2">
                                                <span class="w-2 h-2 bg-primary rounded-full"></span>
                                                <span class="text-sm">
                                                    <?php echo htmlspecialchars($feature); ?>
                                                </span>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="specifications" class="py-6 hidden">
                            <div class="grid grid-cols-2 gap-4">
                                <?php foreach ($product['specifications'] as $key => $value): ?>
                                    <div class="flex justify-between py-2 border-b">
                                        <span class="text-gray-500">
                                            <?php echo htmlspecialchars(ucfirst($key)); ?>
                                        </span>
                                        <span class="font-medium">
                                            <?php echo htmlspecialchars($value); ?>
                                        </span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Similar Products -->
        <section class="mt-16">
            <h2 class="text-2xl font-bold mb-6">Схожі товари</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach ($similarProducts as $similarProduct): ?>
                    <div class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                        <a href="/product.php?id=<?php echo $similarProduct['id']; ?>" class="block flex-1">
                            <img src="<?php echo htmlspecialchars($similarProduct['image']); ?>" 
                                 alt="<?php echo htmlspecialchars($similarProduct['name']); ?>" 
                                 class="w-full h-48 object-contain mb-4">
                            <h3 class="font-medium line-clamp-2 mb-2">
                                <?php echo htmlspecialchars($similarProduct['name']); ?>
                            </h3>
                            <div class="text-sm text-gray-500 mb-2">
                                <?php echo htmlspecialchars($similarProduct['category']); ?>
                            </div>
                            <div class="font-bold text-lg">
                                <?php echo number_format($similarProduct['price'], 0, '.', ' '); ?> грн
                            </div>
                        </a>
                        <div class="mt-4 flex gap-2">
                            <button class="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                                    onclick="addToCart(<?php echo $similarProduct['id']; ?>)">
                                У кошик
                            </button>
                            <button class="p-2 border rounded-md hover:bg-gray-50"
                                    onclick="addToFavorites(<?php echo $similarProduct['id']; ?>)">
                                <img src="/php-templates/assets/icons/icon-heart.svg" alt="У обране" class="w-5 h-5">
                            </button>
                            <button class="p-2 border rounded-md hover:bg-gray-50"
                                    onclick="addToComparison(<?php echo $similarProduct['id']; ?>)">
                                <img src="/php-templates/assets/icons/icon-compare.svg" alt="Порівняти" class="w-5 h-5">
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
    </div>
</div>

<script>
function switchTab(tab) {
    // Hide all tabs
    document.getElementById('description').classList.add('hidden');
    document.getElementById('specifications').classList.add('hidden');
    
    // Show selected tab
    document.getElementById(tab).classList.remove('hidden');
    
    // Update buttons
    const buttons = document.querySelectorAll('[onclick^="switchTab"]');
    buttons.forEach(button => {
        if (button.getAttribute('onclick').includes(tab)) {
            button.classList.add('border-b-2', 'border-primary', 'text-primary');
            button.classList.remove('text-gray-500');
        } else {
            button.classList.remove('border-b-2', 'border-primary', 'text-primary');
            button.classList.add('text-gray-500');
        }
    });
}

function addToCart(productId) {
    // Implementation for adding to cart
}

function addToFavorites(productId) {
    // Implementation for adding to favorites
}

function addToComparison(productId) {
    // Implementation for adding to comparison
}
</script>

<?php require_once 'includes/footer.php'; ?>