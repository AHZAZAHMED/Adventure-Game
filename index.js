#! /usr/bin/env node
import inquirer from "inquirer";
// variables for enemy
let enemies = ["Skeleton", "Zombie", "Warrior", "Assessin"];
let enemyMaxHealth = 75;
let enemyAttackDamage = 25;
// variable for player
let playerMaxHealth = 100;
let playerAttackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropAmount = 50; // percentage
let running = true;
console.log(`\t Welcome to the Game`);
GAME: while (running) {
    console.log("-------------------------------------------");
    let enemyHealth = Math.floor(Math.random() * enemyMaxHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t ${enemy} has appeared \n`);
    while (enemyHealth > 0) {
        console.log(`\t Your HP: ${playerMaxHealth}`);
        console.log(`\t Enemies HP: ${enemyHealth}`);
        console.log(`\tEnter A for attack`);
        console.log(`\tEnter D for attack`);
        console.log(`\tEnter R for attack`);
        let options = await inquirer.prompt([
            {
                message: "What yours action",
                type: "input",
                name: "action",
            },
        ]);
        let action = options.action.toUpperCase();
        console.log(action);
        if (action === "A") {
            let damageDealt = Math.floor(Math.random() * playerAttackDamage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            playerMaxHealth -= damageTaken;
            enemyHealth -= damageDealt;
            console.log(`\t> you strike the ${enemy} for ${damageDealt} damage.`);
            console.log(`\t> you recieve ${damageTaken} amount of damage in retaliation!`);
            if (playerMaxHealth < 1) {
                console.log(`\t> you have recieved to much damage, you are to weak to go on!`);
                break;
            }
        }
        else if (action === "D") {
            if (numHealthPotions > 0) {
                playerMaxHealth += healthPotionHealAmount;
                numHealthPotions--;
                console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}
                \n\t you now have health: ${playerMaxHealth} HP.
                \n\t you now have ${numHealthPotions} health potions left.\n`);
            }
            else {
                console.log(`\tYou dont have a health potion , Defeat the enimies for a chance to get one !`);
            }
        }
        else if (action === "R") {
            console.log(`\tYou run away from ${enemy}!`);
            continue GAME;
        }
        else {
            console.log(`\tInvalid Command!`);
        }
    }
    if (playerMaxHealth < 1) {
        console.log(`\tYOU LOSS`);
        break;
    }
    console.log("-------------------------------------------");
    console.log(`\t# ${enemy} was defeated! #`);
    console.log(`\t# You have ${playerMaxHealth}Hp health left. `);
    if (Math.floor(Math.random() * 100) < healthPotionDropAmount) {
        console.log(`\t# The ${enemy} drop the health potion! `);
        console.log(`\t# Now you have ${numHealthPotions} number of health potions`);
    }
    console.log("-------------------------------------------");
    let askAgain = await inquirer.prompt([
        {
            message: "\tWhat would you like to do now? ",
            type: "list",
            name: "ask",
            choices: ["Continue fighting", "Exit"]
        }
    ]);
    if (askAgain.ask === "Continue fighting") {
        console.log(`\tYou continue on your adventure`);
    }
    else if (askAgain.ask === "Exit") {
        console.log(`\tYou exit your dungeon, successful from your adventure!`);
        break;
    }
}
console.log(`\t######################`);
console.log(`\t# THANKS FOR PLAYING #`);
console.log(`\t######################`);
