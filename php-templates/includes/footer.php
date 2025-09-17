    </main>
    <footer class="bg-white border-t mt-auto">
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Company Info -->
                <div>
                    <h3 class="font-semibold mb-4">Про компанію</h3>
                    <p class="text-sm text-gray-600 mb-4">
                        Інтернет-магазин шкіряних виробів. Великий вибір сумок, гаманців, ремінів та аксесуарів.
                    </p>
                    <div class="flex items-center space-x-4">
                        <a href="tel:+380123456789" class="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                            <img src="/php-templates/assets/icons/icon-phone.svg" alt="" class="w-4 h-4 mr-2">
                            +38 (012) 345-67-89
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="font-semibold mb-4">Швидкі посилання</h3>
                    <ul class="space-y-2">
                        <li><a href="/about.php" class="text-sm text-gray-600 hover:text-gray-900">Про нас</a></li>
                        <li><a href="/delivery.php" class="text-sm text-gray-600 hover:text-gray-900">Доставка</a></li>
                        <li><a href="/payment.php" class="text-sm text-gray-600 hover:text-gray-900">Оплата</a></li>
                        <li><a href="/contacts.php" class="text-sm text-gray-600 hover:text-gray-900">Контакти</a></li>
                    </ul>
                </div>

                <!-- Account -->
                <div>
                    <h3 class="font-semibold mb-4">Особистий кабінет</h3>
                    <ul class="space-y-2">
                        <li><a href="/profile.php" class="text-sm text-gray-600 hover:text-gray-900">Профіль</a></li>
                        <li><a href="/orders.php" class="text-sm text-gray-600 hover:text-gray-900">Мої замовлення</a></li>
                        <li><a href="/favorites.php" class="text-sm text-gray-600 hover:text-gray-900">Обране</a></li>
                        <li><a href="/comparison.php" class="text-sm text-gray-600 hover:text-gray-900">Порівняння</a></li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                    <h3 class="font-semibold mb-4">Розсилка</h3>
                    <p class="text-sm text-gray-600 mb-4">Підпишіться на новини та отримуйте перші сповіщення про акції</p>
                    <form action="/subscribe.php" method="POST" class="flex">
                        <input type="email" name="email" placeholder="Email" required 
                               class="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90">
                            <img src="/php-templates/assets/icons/icon-mail.svg" alt="Підписатися" class="w-4 h-4">
                        </button>
                    </form>
                </div>
            </div>

            <!-- Bottom Footer -->
            <div class="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
                <p class="text-sm text-gray-600">© <?php echo date('Y'); ?> SKLADONLINE. Всі права захищені.</p>
                <div class="mt-4 md:mt-0">
                    <img src="/assets/images/payment-methods.png" alt="Способи оплати" class="h-8">
                </div>
            </div>
        </div>
    </footer>

    <script>
        function toggleCatalog() {
            const dropdown = document.getElementById('catalogDropdown');
            dropdown.classList.toggle('hidden');
        }
    </script>
</body>
</html>