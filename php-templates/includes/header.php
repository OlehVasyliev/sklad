<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'SKLADONLINE'; ?></title>
    <link href="/php-templates/css/global.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-white">
    <header class="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="/" class="flex items-center">
                    <img src="https://skladonline.com.ua//wa-data/public/shop/products/14/webp/data/public/site/themes/dsvpro/img/mylogo.webp?v1622625305?v1.8.1.1754323574" 
                         alt="SKLADONLINE" 
                         class="h-5 object-contain">
                </a>

                <!-- Search bar -->
                <div class="hidden md:flex flex-1 max-w-lg mx-8">
                    <form action="/search.php" class="relative w-full">
                        <input type="text" 
                               name="q" 
                               placeholder="Пошук товарів..." 
                               class="w-full pr-10">
                        <button type="submit" class="absolute right-1 top-1 h-8 w-8 p-0">
                            <img src="/php-templates/assets/icons/icon-search.svg" alt="Пошук" class="w-4 h-4">
                        </button>
                    </form>
                </div>

                <!-- User actions -->
                <div class="flex items-center space-x-4">
                    <a href="/comparison.php" class="hidden lg:flex items-center space-x-1">
                        <img src="/php-templates/assets/icons/icon-compare.svg" alt="Порівняння" class="w-4 h-4">
                        <span class="text-sm">Порівняння</span>
                    </a>
                    
                    <a href="/favorites.php" class="hidden lg:flex items-center space-x-1">
                        <img src="/php-templates/assets/icons/icon-favorites.svg" alt="Улюблені" class="w-4 h-4">
                        <span class="text-sm">Улюблені</span>
                    </a>
                    
                    <a href="/viewed.php" class="hidden lg:flex items-center space-x-1">
                        <img src="/php-templates/assets/icons/icon-viewed.svg" alt="Переглянуті" class="w-4 h-4">
                        <span class="text-sm">Переглянуті</span>
                    </a>

                    <?php if (isset($_SESSION['user'])): ?>
                        <div class="relative group">
                            <button class="flex items-center space-x-1">
                                <img src="/php-templates/assets/icons/icon-user.svg" alt="Користувач" class="w-4 h-4">
                                <span class="text-sm hidden lg:block"><?php echo htmlspecialchars($_SESSION['user']['name']); ?></span>
                                <img src="/php-templates/assets/icons/icon-chevron-down.svg" alt="" class="w-3 h-3">
                            </button>
                            <div class="absolute right-0 top-full mt-1 w-48 bg-white border shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                <a href="/orders.php" class="block px-4 py-2 text-sm hover:bg-gray-50">Мої замовлення</a>
                                <form action="/logout.php" method="POST" class="block w-full">
                                    <button type="submit" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Вийти</button>
                                </form>
                            </div>
                        </div>
                    <?php else: ?>
                        <a href="/login.php" class="flex items-center space-x-1">
                            <img src="/php-templates/assets/icons/icon-user.svg" alt="Кабінет" class="w-4 h-4">
                            <span class="text-sm hidden lg:block">Кабінет</span>
                        </a>
                    <?php endif; ?>

                    <a href="/cart.php" class="flex items-center space-x-1 relative">
                        <img src="/php-templates/assets/icons/icon-cart.svg" alt="Кошик" class="w-4 h-4">
                        <span class="text-sm hidden lg:block">Кошик</span>
                        <?php if (isset($_SESSION['user']) && isset($_SESSION['cart_count']) && $_SESSION['cart_count'] > 0): ?>
                            <span class="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 absolute -top-1 right-0 min-w-[20px] flex items-center justify-center -mr-[10px] ml-3">
                                <?php echo $_SESSION['cart_count']; ?>
                            </span>
                        <?php endif; ?>
                    </a>
                </div>
            </div>

            <!-- Mobile search -->
            <div class="md:hidden mt-4">
                <form action="/search.php" class="relative">
                    <input type="text" 
                           name="q" 
                           placeholder="Пошук товарів..." 
                           class="w-full pr-10">
                    <button type="submit" class="absolute right-1 top-1 h-8 w-8 p-0">
                        <img src="/php-templates/assets/icons/icon-search.svg" alt="Пошук" class="w-4 h-4">
                    </button>
                </form>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="bg-primary text-primary-foreground">
            <div class="container mx-auto px-4">
                <div class="relative flex items-center justify-between">
                    <button class="flex items-center space-x-2 py-3 hover:bg-primary/90 px-4 rounded" 
                            onclick="toggleCatalog()">
                        <img src="/php-templates/assets/icons/icon-menu.svg" alt="" class="w-4 h-4">
                        <span>Каталог товарів</span>
                        <img src="/php-templates/assets/icons/icon-chevron-down.svg" alt="" class="w-4 h-4">
                    </button>

                    <div id="catalogDropdown" class="hidden absolute left-0 right-0 top-full bg-white text-foreground border shadow-lg z-50 max-h-[calc(100vh-var(--header-height)-var(--nav-height))] overflow-y-auto md:w-64 md:left-4 md:right-auto md:max-h-none md:overflow-visible md:rounded-md">
                        <?php include 'catalog-menu.php'; ?>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main class="flex-1 pt-[120px] md:pt-[120px]"><?php // Main content will be inserted here ?>
    <script src="/php-templates/js/main.js"></script>