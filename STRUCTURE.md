# Repository Structure

* `core/`: Domain models (`models.py`), provider interfaces (`interfaces.py`), and business services (`service.py`).
* `infrastructure/`: External API integrations and concrete provider implementations (e.g., `FrankfurterProvider` in `providers.py`).
* `main.py`: Main application entry point that wires dependencies and renders CLI output.
* `requirements.txt`: Dependency list used for installing Python packages.
* `setup.sh`: Helper script to scaffold the project layout and initial files.