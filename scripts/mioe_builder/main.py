import sys
import os

from scripts.mioe_builder.s0_courses import build_s0
from scripts.mioe_builder.s1_courses import build_s1
from scripts.mioe_builder.s2_courses import build_s2

def main():
    print("=" * 60)
    print("MIOE GRADUATE COURSES BUILDER - STATS EDU (UTP)")
    print("=" * 60)
    
    build_s0()
    build_s1()
    build_s2()
    
    print("\n" + "=" * 60)
    print("ALL 10 MIOE COURSES, 20 MODULES & 40 LESSONS BUILT!")
    print("=" * 60)

if __name__ == "__main__":
    main()
