<?php
$pageTitle = 'Каталог - SKLADONLINE';
require_once 'includes/header.php';

// Get category from URL
$category = $_GET['category'] ?? '';

// Get filter values
$brand = $_GET['brand'] ?? '';
$price_min = $_GET['price_min'] ?? '';
$price_max = $_GET['price_max'] ?? '';
$sort = $_GET['sort'] ?? 'default';

// Category name mapping
$categoryNames = [
    '' => 'Каталог товарів',
    'sumky' => 'Сумки',
    'ryukzaky' => 'Рюкзаки',
    'gamanci' => 'Гаманці',
    'portmone' => 'Портмоне',
    'portfeli' => 'Портфелі',
    'papky' => 'Папки',
    'dorozhni-sumky' => 'Дорожні сумки',
    'valizy' => 'Валізи',
    'barsetky' => 'Барсетки',
    'remeni' => 'Ремені',
    'kosmetychky' => 'Косметички',
    'obkladynky-dokumentiv' => 'Обкладинки для документів',
    'vizytnyci' => 'Візитниці',
    'klyuchnyci' => 'Ключниці',
    'aksesuary' => 'Аксесуари'
];

// Sample products data (in real app, this would come from database)
$products = [
    [
        'id' => 1,
        'name' => 'Валіза SAMSONITE S\'Cure Spinner 55cm',
        'price' => 8999,
        'image' => '/path/to/image1.jpg',
        'category' => 'Валізи',
        'brand' => 'Samsonite'
    ],
    // Add more products
];

// Filter products based on category and other filters
if ($category) {
    $products = array_filter($products, function($p) use ($category) {
        return strtolower($p['category']) === strtolower($categoryNames[$category]);
    });
}

if ($brand) {
    $products = array_filter($products, function($p) use ($brand) {
        return strtolower($p['brand']) === strtolower($brand);
    });
}

if ($price_min) {
    $products = array_filter($products, function($p) use ($price_min) {
        return $p['price'] >= $price_min;
    });
}

if ($price_max) {
    $products = array_filter($products, function($p) use ($price_max) {
        return $p['price'] <= $price_max;
    });
}

// Sort products
if ($sort === 'price_asc') {
    usort($products, function($a, $b) { return $a['price'] - $b['price']; });
} elseif ($sort === 'price_desc') {
    usort($products, function($a, $b) { return $b['price'] - $a['price']; });
}

// Pagination
$page = max(1, $_GET['page'] ?? 1);
$perPage = 20;
$totalProducts = count($products);
$totalPages = ceil($totalProducts / $perPage);
$products = array_slice($products, ($page - 1) * $perPage, $perPage);
?>

<div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
        <!-- Breadcrumbs -->
        <nav class="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <a href="/" class="hover:text-foreground transition-colors">Головна</a>
            <span class="text-gray-400">/</span>
            <a href="/catalog.php" class="hover:text-foreground transition-colors">Каталог</a>
            <?php if ($category): ?>
                <span class="text-gray-400">/</span>
                <span class="text-foreground font-medium"><?php echo htmlspecialchars($categoryNames[$category]); ?></span>
            <?php endif; ?>
        </nav>

        <div class="flex items-center justify-between mb-8">
            <div>
                <p class="text-sm text-gray-500">
                    <?php echo $totalProducts; ?> товарів
                </p>
            </div>

            <!-- Sort and View controls -->
            <div class="flex items-center space-x-4">
                <button class="md:hidden border-gray-200 flex items-center space-x-2 px-4 py-2 rounded-md bg-white"
                        onclick="toggleFilters()">
                    <img src="/php-templates/assets/icons/icon-filter.svg" alt="" class="w-4 h-4">
                    <span>Фільтри</span>
                </button>

                <select name="sort" class="border rounded-md px-3 py-2 bg-white" onchange="window.location.href=this.value">
                    <option value="?<?php echo http_build_query(array_merge($_GET, ['sort' => 'default'])); ?>"
                            <?php echo $sort === 'default' ? 'selected' : ''; ?>>
                        За замовчуванням
                    </option>
                    <option value="?<?php echo http_build_query(array_merge($_GET, ['sort' => 'price_asc'])); ?>"
                            <?php echo $sort === 'price_asc' ? 'selected' : ''; ?>>
                        Від дешевших до дорожчих
                    </option>
                    <option value="?<?php echo http_build_query(array_merge($_GET, ['sort' => 'price_desc'])); ?>"
                            <?php echo $sort === 'price_desc' ? 'selected' : ''; ?>>
                        Від дорожчих до дешевших
                    </option>
                </select>
            </div>
        </div>

        <div class="flex gap-6">
            <!-- Filters Sidebar - Desktop -->
            <div class="hidden md:block w-80 flex-shrink-0">
                <div class="border-r border-gray-100 pr-6 pb-6 sticky top-6">
                    <form action="/catalog.php" method="GET">
                        <?php if ($category): ?>
                            <input type="hidden" name="category" value="<?php echo htmlspecialchars($category); ?>">
                        <?php endif; ?>

                        <div class="space-y-6">
                            <!-- Price Filter -->
                            <div>
                                <h3 class="font-medium mb-4">Ціна</h3>
                                <div class="flex items-center gap-4">
                                    <input type="number" name="price_min" placeholder="Від" 
                                           value="<?php echo htmlspecialchars($price_min); ?>"
                                           class="w-full border rounded-md px-3 py-2">
                                    <span>-</span>
                                    <input type="number" name="price_max" placeholder="До"
                                           value="<?php echo htmlspecialchars($price_max); ?>"
                                           class="w-full border rounded-md px-3 py-2">
                                </div>
                            </div>

                            <!-- Brand Filter -->
                            <div>
                                <h3 class="font-medium mb-4">Бренд</h3>
                                <div class="space-y-2">
                                    <?php
                                    $brands = [
                                        'samsonite' => 'Samsonite',
                                        'delsey' => 'Delsey',
                                        'vip' => 'VIP',
                                        'wings' => 'Wings',
                                        'madison' => 'Madison'
                                    ];
                                    foreach ($brands as $brandSlug => $brandName):
                                    ?>
                                        <label class="flex items-center space-x-2">
                                            <input type="radio" name="brand" value="<?php echo $brandSlug; ?>"
                                                   <?php echo $brand === $brandSlug ? 'checked' : ''; ?>
                                                   class="border-gray-300 text-primary">
                                            <span><?php echo htmlspecialchars($brandName); ?></span>
                                        </label>
                                    <?php endforeach; ?>
                                </div>
                            </div>

                            <button type="submit" class="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                                Застосувати
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Products Grid -->
            <div class="flex-1">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <?php foreach ($products as $product): ?>
                        <div class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                            <a href="/product.php?id=<?php echo $product['id']; ?>" class="block flex-1">
                                <img src="<?php echo htmlspecialchars($product['image']); ?>" 
                                     alt="<?php echo htmlspecialchars($product['name']); ?>" 
                                     class="w-full h-48 object-contain mb-4">
                                <h3 class="font-medium line-clamp-2 mb-2">
                                    <?php echo htmlspecialchars($product['name']); ?>
                                </h3>
                                <div class="text-sm text-gray-500 mb-2">
                                    <?php echo htmlspecialchars($product['category']); ?>
                                </div>
                                <div class="font-bold text-lg">
                                    <?php echo number_format($product['price'], 0, '.', ' '); ?> грн
                                </div>
                            </a>
                            <div class="mt-4 flex gap-2">
                                <button class="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                                        onclick="addToCart(<?php echo $product['id']; ?>)">
                                    У кошик
                                </button>
                                <button class="p-2 border rounded-md hover:bg-gray-50"
                                        onclick="addToFavorites(<?php echo $product['id']; ?>)">
                                    <img src="/php-templates/assets/icons/icon-heart.svg" alt="У обране" class="w-5 h-5">
                                </button>
                                <button class="p-2 border rounded-md hover:bg-gray-50"
                                        onclick="addToComparison(<?php echo $product['id']; ?>)">
                                    <img src="/php-templates/assets/icons/icon-compare.svg" alt="Порівняти" class="w-5 h-5">
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Pagination -->
                <?php if ($totalPages > 1): ?>
                    <div class="mt-8 flex justify-center">
                        <div class="flex space-x-2">
                            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                                <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $i])); ?>"
                                   class="px-4 py-2 border rounded-md <?php echo $page === $i ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'; ?>">
                                    <?php echo $i; ?>
                                </a>
                            <?php endfor; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<script>
function toggleFilters() {
    // Implementation for mobile filters toggle
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