sudo docker build -t registry.heroku.com/mysterious-anchorage-75151/web .

sudo docker push registry.heroku.com/mysterious-anchorage-75151/web:latest

heroku container:release web --app mysterious-anchorage-75151
