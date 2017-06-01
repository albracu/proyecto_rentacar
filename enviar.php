<?php

// Traer variables con valores de los campos para la creacion de los registros.

include_once('vtwsclib/Vtiger/WSClient.php');

$url = 'http://45.32.140.117/rentacar';

$client = new Vtiger_WSClient($url);

$login = $client->doLogin('admin', 'MD8pHGTUhqcFZwEY');

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$potentialname = 'Reserva';
$amount = $_POST['amount']; 
$nextstep = $_POST['nextstep'];
$thank="../gracias.html";
$lrecogida = $_POST['lrecogida'];
$frecogida = $_POST['frecogida'];
$hrecogida = $_POST['hrecogida'];
$ldevolucion = $_POST['ldevolucion'];
$fdevolucion = $_POST['fdevolucion'];
$hdevolucion = $_POST['hdevolucion'];
$mensaje = $_POST['mensaje'];


switch ($nextstep) {
    case 'vehiculo1':
        $amount = 99180;
        $desc = 'C economico spark o similar';
        break;

    case 'vehiculo2':
        $amount = 226528;
        $desc = 'FX compacto automatico sandero automatico';
        break;

    case 'vehiculo3':
        $amount = 194648;
        $desc = 'F intermedio sedan aveo, logan o similar';
        break;

    case 'vehiculo4':
        $amount = 270243;
        $desc = 'H ejecutivo versa o similar';
        break;

    case 'vehiculo5':
        $amount = 366520;
        $desc = 'L ejecutivo de lujo mazda 3 o similar';
        break;

    case 'vehiculo6':
        $amount = 302379;
        $desc = 'GX 4x4 utilitaria mecanica duster o similar';
        break;

    case 'vehiculo7':
        $amount = 362397;
        $desc = 'R utilitario de lujo koleos, captiva o similar';
        break;

    case 'vehiculo8':
        $amount = 448987;
        $desc = 'RX 4x4 especial de lujo fortuner 7 puestos o similar';
        break;
}


if(!$login) echo 'Login Failed';

else {
    $module = 'Contacts';

    $record = $client->doCreate($module,
        Array('firstname'=> $firstname, 'lastname'=>$lastname, 'mobile'=>$mobile, 'email'=>$email));

    if($record) {

        $recordid = $client->getRecordId($record['id']);
    }
}

$contacto = $client->doQuery(

    "select id from Contacts order by id desc limit 0,1");


if ($contacto) {
    $contactRecord = $contacto[0];
    $data = array(
        'potentialname' => $potentialname.' - '.$firstname .' '. $lastname,
        'contact_id'    => $contactRecord['id'], // (moduleId x recordId)
        'closingdate'   => date('Y-m-d'),
        'sales_stage'   => 'Prospecting',
        'amount'        => $amount,
        'nextstep'      => $desc,
        'sales_stage'   => 'Reserva Creada',
        'leadsource'    => 'Web Site',
        'cf_852'        => $lrecogida,
        'cf_854'        => $frecogida,
        'cf_856'        => $hrecogida,
        'cf_858'        => $ldevolucion,
        'cf_860'        => $fdevolucion,
        'cf_862'        => $hdevolucion,
        'description'   => $mensaje
        );

    $opportunity = $client->doCreate('Potentials', $data);
    if ($opportunity) {
        print_r($opportunity);
    } else {
        echo $client->getLastError();
    }

    
}

Header ("location: $thank");

?>
