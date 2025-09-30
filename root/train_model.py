import json
import os  


def train_model():
    """
    This is a simple "training" script. It reads the intents and responses
    and structures them into a simple model file that our React app can use.
    """
    try:
        # This is the corrected, robust way to find the file.
        # It looks for the file in the same directory the script is run from.
        script_dir = os.path.dirname(__file__)  # Get the directory of the script
        training_data_path = os.path.join(script_dir, "training_data.json")
        output_model_path = os.path.join(script_dir, "public", "chatbot_model.json")

        with open(training_data_path, "r") as file:
            data = json.load(file)

        model_data = {"intents": []}

        for intent in data["intents"]:
            model_data["intents"].append(
                {
                    "tag": intent["tag"],
                    "patterns": [p.lower() for p in intent["patterns"]],
                    "response": intent["response"],
                }
            )

        # Ensure the 'public' directory exists
        os.makedirs(os.path.dirname(output_model_path), exist_ok=True)

        with open(output_model_path, "w") as file:
            json.dump(model_data, file, indent=2)

        print("✅ Chatbot model training complete!")
        print(f"✅ Model saved to {output_model_path}")

    except FileNotFoundError:
        print(
            f"ERROR: 'training_data.json' not found in the same directory as the script."
        )
        print("Please make sure both files are in your project's root folder.")
    except Exception as e:
        print(f"An error occurred during training: {e}")


if __name__ == "__main__":
    train_model()
