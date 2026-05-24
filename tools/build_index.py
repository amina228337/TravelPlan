#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Собирает index.html из index.template.html и HTML-частей в папке pages/.
Запускать из корня проекта:
    python tools/build_index.py
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
template = (ROOT / "index.template.html").read_text(encoding="utf-8")

def include(match):
    rel = match.group(1).strip()
    path = ROOT / rel
    if not path.exists():
        raise FileNotFoundError(f"Не найден include: {rel}")
    return path.read_text(encoding="utf-8").rstrip() + "\n"

result = re.sub(r"^[ \t]*<!-- INCLUDE ([^>]+?) -->[ \t]*$", include, template, flags=re.MULTILINE)
(ROOT / "index.html").write_text(result, encoding="utf-8")
print("index.html собран из pages/*.html")
