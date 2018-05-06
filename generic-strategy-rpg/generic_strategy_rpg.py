"""
Program Runner

Description: Runs the program

Author: Michael Boyd
Date: 5/4/18
"""
from character import *

if __name__ == "__main__":

    npc_database = {}
    npc_num = 0

    for i in range(0, 10):
        npc_database[npc_num] = Character()
        npc_database[npc_num].display_character()
        npc_num += 1
