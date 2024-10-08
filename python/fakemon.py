import random
import sys

def printGraphic(name):
    if (name == "title"):
        print("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
        print("✨ Welcome to the world of Fakémon! ✨")
        print("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")

    if (name == "FlameSena 🔥"):
        print('    (  )   ')
        print('   (🔥🔥)  ')
        print('  /      \\ ')
        print(' |  o  o  |')
        print(' |   ∆    |')
        print('  \\______ /')
        print('  FlameSena 🔥')
    
    elif (name == "WaterSoomin 💧"):
        print('    ~~~~~  ')
        print('   ( 💧💧 ) ')
        print('  /       \\ ')
        print(' |  ^   ^  | ')
        print(' |    -    | ')
        print('  \\  ~~~  / ')
        print('    ~~~~~   ')
        print('  WaterSoomin 💧')
    
    elif name == "RockFestival 🪨":
        print('    🪨🪨  ')
        print('   /    \\ ')
        print('  (  >_<  ) ')
        print('   \\ -- /  ')
        print('    \\__/   ')
        print('  RockFestival 🪨')

# game over
def gameOver():
    print("The game has ended. Thank you for playing Fakémon!")
    sys.exit()  

# main
def main():
    player_name = input("Enter your name, brave trainer: ")
    printGraphic("title")

    print(f"Welcome, {player_name}!")
    print("In this world, you will train and battle with mysterious creatures called Fakémon.")
    print("But first, you must choose your Fakémon to start your adventure.")
    print("\nChoose your Fakémon:")

    fakemon_type = fakemon()
    enemy_monster = location()

    battle(fakemon_type, enemy_monster)


# 3 Fakémon
def fakemon():
    print("1. FlameSena 🔥  - A Fakémon that's always angry, with flames constantly burning from its head.")
    print("2. WaterSoomin 💧  - A calm but powerful water Fakémon, hiding a terrifying strength.")
    print("3. RockFestival 🪨  - A Fakémon that plays by throwing rocks. Stay close and you might get hit.")

    # Choosing a fakemon
    fakemon_choice = input("Which Fakémon will you choose (1/2/3)? ")
    if fakemon_choice == "1":
        fakemon_type = "FlameSena 🔥"
    elif fakemon_choice == "2":
        fakemon_type = "WaterSoomin 💧"
    else:
        fakemon_type = "RockFestival 🪨"

    print(f"\nYour Fakémon {fakemon_type} is ready for adventure!\n")
    printGraphic(fakemon_type)
    return fakemon_type


# Choosing a location
def location():
    print("Now that you have your Fakémon, where would you like to go?")
    print()
    print("1. Deep Deep Forest 🌲")
    print("2. Loch Ness 🌊")
    print("3. Rocky Mountains 🏔")

    location_choice = input("Choose your destination (1/2/3): ")

    # Setting the location and enemy monster
    if location_choice == "1":
        enemy_monster = "Fox 🦊"
        print('🌲       Deep Deep Forest       🌲')
        print('The wind howls and something lurks between the trees...')

    elif location_choice == "2":
        enemy_monster = "Nessie 🦕"
        print('🌊       Loch Ness       🌊')
        print('A creepy atmosphere.. Beware of what lies beneath the water...')

    else:
        enemy_monster = "Rocky 🪨"
        print('🏔     Rocky Mountains     🏔')
        print('You hear something darting around above you...')


    print(f"A wild {enemy_monster} appears!\n")
    return enemy_monster 

# Battle system
def battle(fakemon_type, enemy_monster):
    player_health = 100
    enemy_health = 100
    super_attack_uses = 2

    while player_health > 0 and enemy_health > 0:
        # Displaying battle status
        print(f"{fakemon_type}'s HP: {player_health}")
        print(f"{enemy_monster}'s HP: {enemy_health}")
        print(f"Super Attack uses remaining: {super_attack_uses}") 
    
        action = input(f"What will {fakemon_type} do? (1. Attack / 2. Super Attack / 3. Run Away): ")

        # Player action choice
        if action == "1":
            damage = random.randint(10, 20)
            print(f"{fakemon_type} attacks {enemy_monster} for {damage} damage! 💥")
            enemy_health -= damage
        elif action == "2":
            if super_attack_uses > 0:
                damage = random.randint(20, 40)
                print(f"{fakemon_type} uses a super attack on {enemy_monster} for {damage} damage! 💥💥")
                enemy_health -= damage
                super_attack_uses -= 1
            else:
                print("No Super Attack uses remaining!")
        elif action == "3":
            print(f"{fakemon_type} successfully ran away! 💨")
            enemy_monster = location()
            battle(fakemon_type, enemy_monster)
            return
    
        # Enemy monster's counterattack
        if enemy_health > 0:
            enemy_damage = random.randint(10, 40)
            print(f"{enemy_monster} strikes back, dealing {enemy_damage} damage! 💥")
            player_health -= enemy_damage
    
    # Game result
    if player_health > 0:
        print(f"\nCongratulations! {fakemon_type} defeated {enemy_monster} and leveled up! 🎉")
    else:
        print(f"\n{enemy_monster} defeated {fakemon_type}. You have perished... 💀")
    gameOver()

main()
