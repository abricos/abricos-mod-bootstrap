<?php
/**
 * @package Abricos
 * @subpackage Bootstrap
 * @author Alexander Kuzmin <roosit@abricos.org>
 */

class BootstrapModule extends Ab_Module {

    public function __construct() {
        // Версия модуля
        $this->version = "0.1.0";

        // Название модуля
        $this->name = "bootstrap";
    }
}

Abricos::ModuleRegister(new BootstrapModule());

?>