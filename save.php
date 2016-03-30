<?php 
    $nom=$_POST['nom'];
    $score=$_POST['score'];
    $db = new PDO('mysql:host=localhost;dbname=main', 'root', '');
    $insert = $db->prepare('INSERT INTO scores (nom, score) VALUES (?, ?)');
    $insert->execute(array($nom,$score));
    header('Location: highscores.php');
?>