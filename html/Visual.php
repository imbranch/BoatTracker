<?php

 $db = mysqli_connect('washington.uww.edu','grinkazr27','zg8216','cs366-2221_grinkazr27')
 or die('Error connecting to MySQL server.');

?>

<html>
 <head>
 <title>Home Page</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/css.css">
 </head>
 <body>
 <body>
        <div id="application">
            <div class="topnav">
                    <a href="home.html">Home</a>
                    <a href="table.html">Main Table</a>
                    <a class="active" href="visual.php">Visualization</a>
                    <a href="about.html">About us</a>
                    <a href="contact.html">Contact us</a>
                    <a href="support.html">Support us</a>
                    <a href="https://github.com/jcy2000/Mo-Jo-Cubed" target="_blank">Our GitHub</a> <br>
            </div>
            <div class="search">
                <input type="text" placeholder="Search..">
                <button type="submit">Submit</button>
            </div>

 <div id="chartContainer1" style="height: 370px; width: 100%;"></div>

 <br>



 <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

<?php



$host = "washington.uww.edu";
$dbname = "cs366-2221_grinkazr27";
$username = "grinkazr27";
$password = "zg8216";


$query = "SELECT COUNT(*) FROM SteamOwns WHERE gameattainment = 'Other'";
mysqli_query($db, $query) or die('Error querying database.');


$result = mysqli_query($db, $query);

$result = $result->fetch_array();
$quantityOther = intval($result[0]);



$query = "SELECT COUNT(*) FROM SteamOwns WHERE gameattainment = 'Purchased'";
mysqli_query($db, $query) or die('Error querying database.');


$result = mysqli_query($db, $query);

$result = $result->fetch_array();
$quantityPaid = intval($result[0]);



$query = "SELECT COUNT(*) FROM SteamOwns WHERE gameattainment = 'Received For Free'";
mysqli_query($db, $query) or die('Error querying database.');


$result = mysqli_query($db, $query);

$result = $result->fetch_array();
$quantityFree = intval($result[0]);

$query = "SELECT COUNT(*) FROM SteamOwns WHERE gameattainment = 'Other'";
mysqli_query($db, $query) or die('Error querying database.');





$query = "CALL getGameNameWithMostReviewsFromAuthorsWhoGotItForFree()";

$result = $db->query($query);

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    $sql = 'CALL getGameNameWithMostReviewsFromAuthorsWhoGotItForFree()';
    
    $q = $pdo->query($sql);
    $q->setFetchMode(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    $sql = 'select g.appname, count(r.review_id) as Count
    from SteamGames g, SteamReviews r
    where g.appid=r.appid
    group by g.appname
    order by count(r.review_id) desc; 
    ';
    
    $q2 = $pdo->query($sql);
    $q2->setFetchMode(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    $sql = 'select g.appname, count(su.authorsteamid) as Count
    from SteamGames g, SteamUsers su, SteamOwns o
    where g.appid=o.appid and o.authorsteamid=su.authorsteamid
    group by g.appname
    order by count(su.authorsteamid) desc;
    ';
    
    $q3 = $pdo->query($sql);
    $q3->setFetchMode(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    $sql = 'select g.appname, count(su.authorsteamid) AS Count
    from SteamGames g, SteamUsers su, SteamOwns o, SteamReviews r
    where g.appid=o.appid and o.authorsteamid=su.authorsteamid and su.authorsteamid=r.authorsteamid and r.playtimetotal > 1000
    group by g.appname
    order by count(su.authorsteamid) desc; 
    ';
    
    $q4 = $pdo->query($sql);
    $q4->setFetchMode(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    $sql = 'select g.appname, count(r.comentcount) as Count
    from SteamReviews r, SteamGames g 
    where r.appid = g.appid and r.comentcount > 0 
    group by g.appname 
    order by count(r.comentcount) desc;
    ';
    
    $q6 = $pdo->query($sql);
    $q6->setFetchMode(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    $sql = 'select g.appname, count(r.comentcount) as Count
    from SteamReviews r, SteamGames g
    where r.appid = g.appid and r.comentcount >= 1
    group by g.appname
    order by count(r.comentcount) desc;
    ';
    
    $q5 = $pdo->query($sql);
    $q5->setFetchMode(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}

?>

<h2 >The Game that has the Most Reviews That Users Where Given For Free</h2>

<?php while ($r = $q->fetch()): ?>
                <tr>
                    <td><?php echo $r['appname'] ?></td>
                </tr>
<?php endwhile; ?>


<h2 >Total amount of reviews for each game</h2>
<table>
            <tr>
                <th>Game Name</th>
                <th>Review Count</th>
            </tr>
<?php while ($r = $q2->fetch()): ?>
                <tr>
                    <td><?php echo $r['appname'] ?></td>
                    <td><?php echo $r['Count'] ?></td>
                </tr>
<?php endwhile; ?>
</table>

<h2>Total amount of users who own each game</h2>
<table>
            <tr>
                <th>Game Name</th>
                <th>Review Count</th>
            </tr>
<?php while ($r = $q3->fetch()): ?>
                <tr>
                    <td><?php echo $r['appname'] ?></td>
                    <td><?php echo $r['Count'] ?></td>
                </tr>
<?php endwhile; ?>
</table>

<h2>Total amount of users that have played over 1000 hours in a certain game</h2>
<table>
            <tr>
                <th>Game Name</th>
                <th>Review Count</th>
            </tr>
<?php while ($r = $q4->fetch()): ?>
                <tr>
                    <td><?php echo $r['appname'] ?></td>
                    <td><?php echo $r['Count'] ?></td>
                </tr>
<?php endwhile; ?>
</table>

<h2>Total amount of reviews from each game that have at least 1 comment</h2>
<table>
            <tr>
                <th>Game Name</th>
                <th>Review Count</th>
            </tr>
<?php while ($r = $q5->fetch()): ?>
                <tr>
                    <td><?php echo $r['appname'] ?></td>
                    <td><?php echo $r['Count'] ?></td>
                </tr>
<?php endwhile; ?>
</table>

<h2>Total amount of comments for each game</h2>
<table>
            <tr>
                <th>Game Name</th>
                <th>Review Count</th>
            </tr>
<?php while ($r = $q6->fetch()): ?>
                <tr>
                    <td><?php echo $r['appname'] ?></td>
                    <td><?php echo $r['Count'] ?></td>
                </tr>
<?php endwhile; ?>
</table>

<Script>
window.onload = function() {
var $other = <?=$quantityOther?>;
var $paid = <?=$quantityPaid?>;
var $free = <?=$quantityFree?>;

var $jFreeg = <?=$r?>;

let fillData = () => {
    let eleament = document.getElementById('jsfreeBlock');
    eleament.innerHTML += $jFreeg;
}

var dataForTable = [
    {x: "Paid in Other Way", value: $other},
    {x: "Was Free", value: $free},
    {x: "Paid in House", value: $paid}
];

var chart = new CanvasJS.Chart("chartContainer1", {
	animationEnabled: true,
	title: {
		text: "How Steam Games Where Attainted in 2021" 
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "",
		indexLabel: "{label} {y}",
		dataPoints: [
			{y: $other, label: "Paid in Other Way"},
			{y: $paid, label: "Paid in House"},
			{y: $free, label: "Was Free"},
		]
	}]
});




    




console.log($other);

};


</Script>
</body>
</html>