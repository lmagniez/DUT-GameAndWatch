<html>
    <head>
        <meta charset="utf-8">
        <title>DonkeyKong - Beta</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    </head>
    
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
              </button>
            </div>
            <div class="collapse navbar-collapse text-center divnav" id="myNavbar">
                <a class="other" href="game2J.html">2 Joueurs (Beta)</a>
                <a class="accueil" href="game.html">DonkeyKong</a>
                <a class="other" href="highscores.php">HighScores</a>
            </div>
          </div>
        </nav>

        <div class="container">
            <?php      
                $db = new PDO('mysql:host=localhost;dbname=main', 'root', '');
                $select = $db->prepare('SELECT * FROM scores ORDER BY score DESC');
                $select->execute();
                $users = $select->fetchAll();
                print('<div class="table-responsive"><table class="table"><thead><tr><th>Joueur</th><th>Score</th></tr></thead><tbody>');
                for($i=0;$i<count($users);$i++){
                    print('<tr><td>'.$users[$i]["nom"].'</td>');
                    print('<td>'.$users[$i]["score"].'</td></tr>');
                }
                print('</tbody></table>');
            ?>
            </div> 
    </body>
</html>