<?php 
use PHPUnit\Framework\TestCase;
use App\Classes\Main;

class AllTests extends TestCase {
    public function testA() {
        $this->assertIsString(Main::unitTestGetComputerHand());
        $this->assertIsArray(Main::unitTestPlayerVsComputer("paper"));
    }
}