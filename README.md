# Frontline VR 🚑 🥽
**Frontline VR** is a WebXR-based training simulation designed to bridge the gap between theoretical first-aid knowledge and real-world application. Unlike traditional classroom settings, this project immerses users in high-pressure 3D environments to simulate the urgency and uncertainty of actual crises.

Built using **Wonderland Engine** and **JavaScript**, the application focuses on decision-focused training where users must interact with victims and make time-critical choices. The project currently features two core scenarios:

* **CPR Training**: A cardiac arrest simulation in a café setting, featuring rhythm-based chest compression mechanics and response checks.

* **Emergency Response**: A stabbing incident in an alleyway focusing on hemorrhage control and scene safety.

# Project Structure & Installation
The repository contains two folder directories corresponding to the different development environments. **However, you only need to run the CPR project to experience the full application.**

`CPR_Scenario/` **(Main Application)**: This is the primary project folder. It contains the main menu and the CPR training module. It also contains the pre-compiled binary for the stabbing scenario.

`Stabbing_Scenario/` **(Source Only)**: This folder contains the raw source assets for the stabbing scene.

**How to Run**
1. **Clone/Download** the repository.

2. Open **Wonderland Engine**.

3. Open the project located in the `CPR_Scenario/` folder.

4. Press **Run** (or Package) from this project. The main menu will load, and you will be able to seamlessly switch between the CPR and Stabbing scenarios from there.

⚠️ **IMPORTANT**: You do **not** need to build, open, or modify the `Stabbing_Scenario` folder. The stabbing scene has already been pre-built and embedded into the `CPR_Scenario` project as a `.bin` file.

**Please do not attempt to rebuild the Stabbing project manually**, as this may overwrite the correct binary linkages and cause the scene switching logic to fail. Simply running the CPR project is sufficient.
