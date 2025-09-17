<?php
$categories = [
    ['name' => 'Всі товари', 'slug' => '', 'href' => '/catalog.php'],
    ['name' => 'Промоакції', 'slug' => 'akcii', 'href' => '/catalog.php?category=akcii'],
    ['name' => 'Чоловічі сумки', 'slug' => 'sumky-cholovichi', 'href' => '/catalog.php?category=sumky-cholovichi'],
    ['name' => 'Жіночі сумки', 'slug' => 'sumky-zhinochi', 'href' => '/catalog.php?category=sumky-zhinochi'],
    ['name' => 'Сумки', 'slug' => 'sumky', 'href' => '/catalog.php?category=sumky'],
    ['name' => 'Рюкзаки', 'slug' => 'ryukzaky', 'href' => '/catalog.php?category=ryukzaky'],
    ['name' => 'Гаманці', 'slug' => 'gamanci', 'href' => '/catalog.php?category=gamanci'],
    ['name' => 'Портмоне', 'slug' => 'portmone', 'href' => '/catalog.php?category=portmone'],
    ['name' => 'Портфелі', 'slug' => 'portfeli', 'href' => '/catalog.php?category=portfeli'],
    ['name' => 'Папки', 'slug' => 'papky', 'href' => '/catalog.php?category=papky'],
    ['name' => 'Дорожні сумки', 'slug' => 'dorozhni-sumky', 'href' => '/catalog.php?category=dorozhni-sumky'],
    ['name' => 'Валізи', 'slug' => 'valizy', 'href' => '/catalog.php?category=valizy'],
    ['name' => 'Барсетки', 'slug' => 'barsetky', 'href' => '/catalog.php?category=barsetky'],
    ['name' => 'Ремені', 'slug' => 'remeni', 'href' => '/catalog.php?category=remeni'],
    ['name' => 'Косметички', 'slug' => 'kosmetychky', 'href' => '/catalog.php?category=kosmetychky'],
    ['name' => 'Обкладинки для документів', 'slug' => 'obkladynky-dokumentiv', 'href' => '/catalog.php?category=obkladynky-dokumentiv'],
    ['name' => 'Візитниці', 'slug' => 'vizytnyci', 'href' => '/catalog.php?category=vizytnyci'],
    ['name' => 'Ключниці', 'slug' => 'klyuchnyci', 'href' => '/catalog.php?category=klyuchnyci'],
    ['name' => 'Аксесуари', 'slug' => 'aksesuary', 'href' => '/catalog.php?category=aksesuary']
];

foreach ($categories as $category): ?>
    <a href="<?php echo htmlspecialchars($category['href']); ?>" 
       class="block px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0" 
       onclick="toggleCatalog()">
        <?php echo htmlspecialchars($category['name']); ?>
    </a>
<?php endforeach; ?>