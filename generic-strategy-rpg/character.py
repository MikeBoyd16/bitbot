"""
Class: Character

Description:The character class contains every type of character that
can exist in the game.

Author: Michael Boyd
Date: 4/27/18
"""
import random


class Character:
    """
    The base object for all character types
    """
    demographics = {"ID": -1, "Type": "", "Name": "", "Level": 1, "Occupation": "", "Social Class": "",
                    "Basic Combat Class": "", "Advanced Combat Class": ""}
    combat_attributes = {"Health": 0, "Mana": 0, "Stamina": 0, "Attack": 0, "Defense": 0}
    ability_attributes = {"Strength": 0, "Agility": 0, "Endurance": 0, "Intelligence": 0, "Charisma": 0, "Luck": 0}
    skills = {"Professions": {"Alchemy": 0, "Blacksmithing": 0, "Tailoring": 0, "Woodworking": 0, "Enchanting": 0},
              "Weapons": {"Axe": 0, "Mace": 0, "Blade": 0, "Bow": 0, "Staff": 0},
              "Armor": {"Light Armor": 0, "Medium Armor": 0, "Heavy Armor": 0, "Unarmored": 0},
              "Magic": {"Runecasting": 0, "Inscription": 0},
              "Academic": {"Astrology": 0, "History": 0, "Linguistics": 0, "Cartography": 0},
              "Social": {"Mercantile": 0, "Speechcraft": 0, "Politik": 0},
              "Survival": {"Dungeoneering": 0}}
    currency = {"Standard Coin": {"Copper": 0, "Silver": 0, "Gold": 0, "Platinum": 0}}
    inventory = {"Equipped": {"Head": None, "Neck": None, "Shoulders": None, "Chest": None, "Belt": None,
                              "Gloves": None, "Leggings": None, "Boots": None, "Ring 1": None, "Ring 2": None},
                 "Storage": {"Slot 1": None, "Slot 2": None, "Slot 3": None, "Slot 4": None, "Slot 5": None,
                             "Slot 6": None, "Slot 7": None, "Slot 8": None, "Slot 9": None, "Slot 10": None}}

    def __init__(self, name=None, player_type="NPC", level=1, basic_combat_class=None):
        self.demographics["Name"] = name
        self.demographics["Level"] = level
        self.demographics["Basic Combat Class"] = basic_combat_class
        self.calculate_combat_attributes()
        if player_type == "PC":
            self.generate_pc()
        else:
            self.generate_npc()

    def calculate_combat_attributes(self):
        """
        Calculates a character's base stats based on level
        """
        self.combat_attributes["Health"] = self.demographics["Level"] * 50
        self.combat_attributes["Mana"] = self.demographics["Level"] * 25
        self.combat_attributes["Stamina"] = self.demographics["Level"] * 25
        self.combat_attributes["Attack"] = self.demographics["Level"] * 15
        self.combat_attributes["Defense"] = self.demographics["Level"] * 15

    def level_up(self):
        """
        Adds 1 to level and recalculates a character's base stats
        """
        self.demographics["Level"] += 1
        self.calculate_combat_attributes()

    def generate_pc(self):
        print(self.demographics["Type"])

    def generate_npc(self):
        """
        Randomly generate the name and class of a character
        """
        first_names_file = open("character_first_names.txt", "r")
        character_first_names = first_names_file.read().split()

        last_names_file = open("character_last_names.txt", "r")
        character_last_names = last_names_file.read().split()

        class_file = open("base_classes.txt", "r")
        base_classes = class_file.read().split()

        random_index = random.randrange(0, len(character_first_names))
        self.demographics["Name"] = character_first_names[random_index]

        random_index = random.randrange(0, len(character_last_names))
        self.demographics["Name"] += " " + character_last_names[random_index]

        random_index = random.randrange(0, len(base_classes))
        self.demographics["Basic Combat Class"] = base_classes[random_index]

    def display_character(self):
        print("CHARACTER INFO:\n"
              "Name: " + self.demographics["Name"] + "\n"
              "Level: " + str(self.demographics["Level"]) + "\n"
              "Class: " + self.demographics["Basic Combat Class"] + "\n"
              "Health: " + str(self.combat_attributes["Health"]) + "\n"
              "Mana: " + str(self.combat_attributes["Mana"]) + "\n"
              "Stamina: " + str(self.combat_attributes["Stamina"]) + "\n"
              "Attack: " + str(self.combat_attributes["Attack"]) + "\n"
              "Defense: " + str(self.combat_attributes["Defense"]) + "\n")
