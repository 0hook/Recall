# Recall Nuker

Recall is a proof-of-concept Discord nuking bot built with Discord.js v14+ and TypeScript. This is a legacy project that has been refactored and improved to demonstrate modern JavaScript/TypeScript expertise.

### Commands

Recall supports the following commands:

- **`dc`**: Delete all channels
- **`dr`**: Delete all roles
- **`cr <amount>`**: Create roles
- **`ka`**: Kick all users
- **`ba`**: Ban all users
- **`mp <amount>`**: Mention `@everyone` in each channel
- **`dw`**: Delete all webhooks
- **`kb`**: Kick all bots
- **`bb`**: Ban all bots
- **`k <role name>`**: Kick users with the specified role
- **`b <role name>`**: Ban users with the specified role
- **`mc <amount> [-v]`**: Create channels (use `-v` for voice channels)
- **`nuke <channelsAmount> <mentionsAmount>`**: Delete channels and mention `@everyone`

## Setup

### Prerequisites

- Node.js (v18.0.0 or later)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/0hook/Recall
   cd Recall
   ```

2. **Run the Install Script**

   This script will set up the configuration file, install all necessary dependencies, and build the TypeScript code.

   ```sh
   ./Install.bat
   ```

3. **Configure the Bot**

   Edit the `config.ini` file to add your bot's token and settings.

   ```ini
   [settings]
   prefix=your_prefix (!)
   token=your_bot_token
   operators=your_user_id
   ```

   For multiple operators, separate IDs with commas:
   
   ```ini
   operators=id1,id2,id3
   ```

4. **Start the Bot**

   Run the following command to start Recall.

   ```sh
   ./Recall.bat
   ```

## Disclaimer

**WARNING**: This bot is for educational and ethical purposes only. Misuse, such as deploying the bot on servers without proper authorization, is strictly prohibited and against Discord's Terms of Service.
