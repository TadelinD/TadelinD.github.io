<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <link rel= "stylesheet" href = "receipt.css">
</head>
<body>
    <?php
    $fname = $_POST['customerName'];
    print("<h1>Order for $fname</h1>");
    print("<li>Full name: $fname");

    $email = $_POST['customerEmail'];
    print("<li>Email: $email");

    $product = $_POST['product'];
    print("<li>Product: $product");

    $quantity = $_POST['quantity'];
    print("<li>Quantity Ordered: $quantity");

    $value = 0;
    if($product == "poster"){
        $value = 10;
    }
    else if($product == "sticker"){
        $value = 2;
    }

    $total = $value * $quantity;
    print("<li>Total: $$total");


    function store($line){
        $wfile = fopen("store.txt", "a");
        fwrite($wfile, $line);
        fclose($wfile);
    }

    function getForminfo(){
        $line = "";
        foreach($_POST as $key => $value){
            $line .= $key . ":" . $value . "\n";
        }
        global $total;
        $line .= "Total:" . $total . "\n";
        $line .= "\n";
        return $line;
    }

    $line = getForminfo();
    store($line);

    ?>
</body>