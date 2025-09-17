<?php
$pageTitle = 'Оформлення замовлення - SKLADONLINE';
require_once 'includes/header.php';

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    header('Location: /login.php?redirect=checkout.php');
    exit;
}

// Get cart summary
$totalItems = 0;
$totalPrice = 0;
$cartItems = []; // In real app, get from session or database

if (empty($cartItems)) {
    header('Location: /cart.php');
    exit;
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and process the order
    // Redirect to success page or show errors
}
?>

<div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold mb-8">Оформлення замовлення</h1>

            <form method="POST" class="space-y-8">
                <!-- Contact Information -->
                <div class="bg-white rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Контактні дані</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Ім'я</label>
                            <input type="text" name="firstName" required
                                   class="w-full border rounded-md px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Прізвище</label>
                            <input type="text" name="lastName" required
                                   class="w-full border rounded-md px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Телефон</label>
                            <input type="tel" name="phone" required
                                   class="w-full border rounded-md px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Email</label>
                            <input type="email" name="email" required
                                   class="w-full border rounded-md px-3 py-2">
                        </div>
                    </div>
                </div>

                <!-- Delivery -->
                <div class="bg-white rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Доставка</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="flex items-center space-x-3">
                                <input type="radio" name="delivery" value="nova_poshta" 
                                       checked class="border-gray-300 text-primary">
                                <span>Нова Пошта</span>
                            </label>
                        </div>
                        <div>
                            <label class="flex items-center space-x-3">
                                <input type="radio" name="delivery" value="ukrposhta" 
                                       class="border-gray-300 text-primary">
                                <span>Укрпошта</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Область</label>
                                <select name="region" required class="w-full border rounded-md px-3 py-2">
                                    <option value="">Оберіть область</option>
                                    <!-- Add regions -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Місто</label>
                                <select name="city" required class="w-full border rounded-md px-3 py-2">
                                    <option value="">Оберіть місто</option>
                                    <!-- Add cities -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Відділення</label>
                                <select name="office" required class="w-full border rounded-md px-3 py-2">
                                    <option value="">Оберіть відділення</option>
                                    <!-- Add offices -->
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment -->
                <div class="bg-white rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Оплата</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="flex items-center space-x-3">
                                <input type="radio" name="payment" value="card" 
                                       checked class="border-gray-300 text-primary">
                                <span>Оплата картою онлайн</span>
                            </label>
                        </div>
                        <div>
                            <label class="flex items-center space-x-3">
                                <input type="radio" name="payment" value="cod" 
                                       class="border-gray-300 text-primary">
                                <span>Накладений платіж</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="bg-white rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Ваше замовлення</h2>
                    <div class="space-y-4">
                        <div class="text-sm text-gray-600">
                            Ви замовляєте <?php echo $totalItems; ?> товарів на суму <?php echo number_format($totalPrice, 0, '.', ' '); ?> грн
                        </div>
                        <div class="border-t pt-4">
                            <div class="flex justify-between">
                                <span>Вартість товарів</span>
                                <span><?php echo number_format($totalPrice, 0, '.', ' '); ?> грн</span>
                            </div>
                            <div class="flex justify-between mt-2">
                                <span>Доставка</span>
                                <span>За тарифами перевізника</span>
                            </div>
                            <div class="flex justify-between mt-4 text-lg font-bold">
                                <span>До сплати</span>
                                <span><?php echo number_format($totalPrice, 0, '.', ' '); ?> грн</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" 
                        class="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                    Підтвердити замовлення
                </button>
            </form>
        </div>
    </div>
</div>

<script>
// Add dynamic form handling for regions, cities, and offices
</script>

<?php require_once 'includes/footer.php'; ?>