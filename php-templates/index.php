<?php
$pageTitle = 'SKLADONLINE - Шкіряні вироби оптом та в роздріб';
require_once 'includes/header.php';

// Sample featured products
$featuredProducts = [
    [
        'id' => 1,
        'name' => 'Чоловіча сумка LUXON Business Elite',
        'price' => '1299',
        'image' => 'path/to/image1.jpg',
        'category' => 'Чоловічі сумки'
    ],
    [
        'id' => 2,
        'name' => 'Жіноча сумка DAVID JONES Elegance',
        'price' => '999',
        'image' => 'path/to/image2.jpg',
        'category' => 'Жіночі сумки'
    ],
    // Add more products as needed
];
?>

<!-- Banner Slider -->
<div class="relative">
    <!-- Add your banner slider implementation here -->
</div>

<!-- Company Info Section -->
<section class="py-8 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="text-center">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
                Оптовий склад ділової шкіряної галантереї
            </h2>
            <p class="text-gray-600">
                Офіційний дистриб'ютор торгових марок: 
                <span class="font-medium">Luxon, Tigernu, David Jones, Himawari, Safenta, Vermari, Alfa Ricco, Cantlor, Bradford, Hassion</span> 
                в Україні
            </p>
        </div>
    </div>
</section>

<!-- Featured Products -->
<section class="py-16">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Популярні товари</h2>
            <p class="text-gray-600">Спеціальні пропозиції та знижки на популярні товари</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php foreach ($featuredProducts as $product): ?>
                <div class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                    <a href="/product.php?id=<?php echo $product['id']; ?>" class="block flex-1">
                        <img src="<?php echo htmlspecialchars($product['image']); ?>" 
                             alt="<?php echo htmlspecialchars($product['name']); ?>" 
                             class="w-full h-48 object-contain mb-4">
                        <h3 class="font-medium line-clamp-2 mb-2"><?php echo htmlspecialchars($product['name']); ?></h3>
                        <div class="text-sm text-gray-500 mb-2"><?php echo htmlspecialchars($product['category']); ?></div>
                        <div class="font-bold text-lg"><?php echo number_format($product['price'], 0, '.', ' '); ?> грн</div>
                    </a>
                    <div class="mt-4 flex gap-2">
                        <button class="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                            У кошик
                        </button>
                        <button class="p-2 border rounded-md hover:bg-gray-50">
                            <img src="/php-templates/assets/icons/icon-heart.svg" alt="У обране" class="w-5 h-5">
                        </button>
                        <button class="p-2 border rounded-md hover:bg-gray-50">
                            <img src="/php-templates/assets/icons/icon-compare.svg" alt="Порівняти" class="w-5 h-5">
                        </button>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
                <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="/php-templates/assets/icons/icon-delivery.svg" alt="" class="w-8 h-8 text-primary">
                </div>
                <h3 class="text-xl font-semibold mb-3">Швидка доставка</h3>
                <p class="text-gray-600">Оперативна доставка замовлень по всій території України</p>
            </div>

            <div class="text-center">
                <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="/php-templates/assets/icons/icon-wholesale.svg" alt="" class="w-8 h-8 text-primary">
                </div>
                <h3 class="text-xl font-semibold mb-3">Оптові ціни</h3>
                <p class="text-gray-600">Спеціальні умови для оптових замовлень</p>
            </div>

            <div class="text-center">
                <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="/php-templates/assets/icons/icon-discount.svg" alt="" class="w-8 h-8 text-primary">
                </div>
                <h3 class="text-xl font-semibold mb-3">Програма лояльності</h3>
                <p class="text-gray-600">Знижки та спеціальні пропозиції для постійних клієнтів</p>
            </div>
        </div>
    </div>
</section>

<!-- About Company Section -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-8">Про SKLADONLINE</h2>
            <div class="text-lg text-gray-600 space-y-4 leading-relaxed">
                <p>
                    Ми спеціалізуємося на якісних товарах з натуральної та екошкіри від провідних світових виробників.
                </p>
                <p>
                    Наша мета - забезпечити партнерів найкращими товарами за оптимальними цінами з неперевершеним 
                    сервісом та підтримкою на всіх етапах співпраці.
                </p>
            </div>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>