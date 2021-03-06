from app import create_main_app

from config import DevConfig, ProdConfig

app = create_main_app(ProdConfig)

if app is None:
    print('[Error]: No config provided')

# Точка входа приложения, запуск Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
