# Compiler Visualizer for a Rule-Based Decision Language

A full-stack mini compiler project that demonstrates **all traditional phases of a compiler** through a **custom-designed rule-based decision language**, with interactive **phase-wise visualization**.

---

## Overview

This project implements a **compiler visualizer** that takes high-level decision rules as input and transforms them step-by-step into an optimized decision structure.

Unlike traditional toy compilers (e.g., arithmetic or mini-C), this project focuses on a **Domain-Specific Language (DSL)** for expressing decision logic, making it both **academically rigorous** and **practically relevant**.

---

## Objective

The goal of this project is to:

- Demonstrate **all core compiler phases**
- Provide **clear visualizations** of each transformation step
- Improve conceptual understanding of compiler internals
- Show how compilers can be applied beyond programming languages

---

## Problem Statement

Most compiler projects:

- Use overly simple languages (only expressions)
- Skip semantic analysis or optimization
- Lack meaningful visualization

This project solves these issues by:

- Introducing a **rule-based decision language**
- Performing **semantic validation and optimization**
- Visualizing each phase interactively

---

## Sample Input Language

```text
RULE r1:
IF age > 18 AND citizen == true
THEN ALLOW
ELSE DENY
END
```
