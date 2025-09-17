<?php
$pageTitle = 'Кошик - SKLADONLINE';
require_once 'includes/header.php';

// In a real application, you would get cart items from the session or database
$cartItems = [
    [
        'id' => 1,
        'name' => 'Валіза SAMSONITE S\'Cure Spinner 55cm',
        'price' => 8999,
        'quantity' => 1,
        'image' => '/path/to/image1.jpg'
    ],
    // Add more items
];

$total = array_reduce($cartItems, function($sum, $item) {
    return $sum + ($item['price'] * $item['quantity']);
}, 0);

$isCartEmpty = empty($cartItems);
?>

<div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Кошик</h1>

        <?php if ($isCartEmpty): ?>
            <div class="bg-white rounded-lg p-8 text-center">
                <h2 class="text-2xl font-semibold mb-4">Ваш кошик порожній</h2>
                <p class="text-gray-600 mb-6">
                    Додайте товари з каталогу, щоб продовжити покупки
                </p>
                <a href="/catalog.php" class="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                    Перейти до каталогу
                </a>
            </div>
        <?php else: ?>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Cart Items -->
                <div class="lg:col-span-2 space-y-4">
                    <?php foreach ($cartItems as $item): ?>
                        <div class="bg-white rounded-lg p-4 flex gap-4">
                            <a href="/product.php?id=<?php echo $item['id']; ?>" class="w-24 h-24 flex-shrink-0">
                                <img src="<?php echo htmlspecialchars($item['image']); ?>" 
                                     alt="<?php echo htmlspecialchars($item['name']); ?>"
                                     class="w-full h-full object-contain">
                            </a>
                            <div class="flex-1 min-w-0">
                                <a href="/product.php?id=<?php echo $item['id']; ?>" 
                                   class="font-medium hover:text-primary">
                                    <?php echo htmlspecialchars($item['name']); ?>
                                </a>
                                <div class="mt-2 flex flex-wrap gap-4">
                                    <div class="flex items-center border rounded-md">
                                        <button class="px-3 py-1 hover:bg-gray-50"
                                                onclick="updateQuantity(<?php echo $item['id']; ?>, 'decrease')">
                                            -
                                        </button>
                                        <input type="number" value="<?php echo $item['quantity']; ?>" 
                                               min="1" max="99"
                                               class="w-12 text-center border-x py-1"
                                               onchange="updateQuantity(<?php echo $item['id']; ?>, this.value)">
                                        <button class="px-3 py-1 hover:bg-gray-50"
                                                onclick="updateQuantity(<?php echo $item['id']; ?>, 'increase')">
                                            +
                                        </button>
                                    </div>
                                    <div class="font-bold">
                                        <?php echo number_format($item['price'], 0, '.', ' '); ?> грн
                                    </div>
                                </div>
                            </div>
                            <button class="text-gray-400 hover:text-gray-600"
                                    onclick="removeFromCart(<?php echo $item['id']; ?>)">
                                <img src="/php-templates/assets/icons/icon-close.svg" alt="Видалити" class="w-5 h-5">
                            </button>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Order Summary -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg p-6 sticky top-6">
                        <h2 class="text-lg font-semibold mb-4">Сума замовлення</h2>
                        <div class="space-y-2 mb-6">
                            <div class="flex justify-between">
                                <span>Товари</span>
                                <span><?php echo number_format($total, 0, '.', ' '); ?> грн</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Доставка</span>
                                <span>За тарифами перевізника</span>
                            </div>
                            <div class="border-t pt-4 font-bold flex justify-between">
                                <span>До сплати</span>
                                <span><?php echo number_format($total, 0, '.', ' '); ?> грн</span>
                            </div>
                        </div>
                        <a href="/checkout.php" 
                           class="block w-full bg-primary text-white text-center px-6 py-3 rounded-md hover:bg-primary/90">
                            Оформити замовлення
                        </a>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>

<script>
function updateQuantity(productId, value) {
    // Implementation for updating quantity
    if (value === 'decrease') {
        // Decrease quantity
    } else if (value === 'increase') {
        // Increase quantity
    } else {
        // Set specific quantity
    }
}

function removeFromCart(productId) {
    // Implementation for removing from cart
}
</script>

<?php require_once 'includes/footer.php'; ?>