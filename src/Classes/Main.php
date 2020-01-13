<?php

namespace App\Classes;

abstract class Main {

    //draw = 0, loos = -1, win = 1
    private static $gameWinConditions = [
        "paper-rock" => 1,
        "paper-paper" => 0,
        "rock-scissors" => 1,
        "rock-rock" => 0,
        "scissors-paper" => 1,
        "scissors-scissors" => 0,
    ];

    private static $handsList = ["rock", "paper", "scissors"];
    private static $entityBody;
    private static $objectResponse = [];
    
    public function init(...$args): void {

        try {
            self::$entityBody = \json_decode(file_get_contents('php://input'));
            if(self::$entityBody->webservice) {
                self::runAsWebService(self::$entityBody);
            }
        } catch(\Exception $e) { }
    
        self::jsonResponse(self::$objectResponse);
    }

    private function runAsWebService($entityBody): void {
        $method = $entityBody->method;
        try {
            self::{$method."Action"}($entityBody);
        } catch(\Exception $e) {
            self::$objectResponse["message"] = $e;
        }
    }

    private function jsonResponse(array $objectResponse): void {
        header('Content-Type: application/json');
        print \json_encode($objectResponse);
    }

    private function playerHasPlayedAction($entityBody): array {
        $handType = $entityBody->handType;
        self::$objectResponse["message"] = "playerHasPlayed";
        self::$objectResponse["gameResult"] = self::playerVsComputer($handType);

        return self::$objectResponse;
    }

    public function playerVsComputer(string $handType): array {
        $cptr = self::getComputerHand();
        $res = self::$gameWinConditions[$handType."-".$cptr] ?? -1;
        return ["win" => $res, "player" => $handType, "enemy" => $cptr];
    }

    private function getComputerHand(): string {
        return self::$handsList[rand(0, 2)];
    }

    public function unitTestPlayerVsComputer(string $handType): array {
        return self::playerVsComputer($handType);
    }

    public function unitTestGetComputerHand(): string {
        return self::getComputerHand();
    }
}