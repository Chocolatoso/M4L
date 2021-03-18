sudo docker build -t registry.heroku.com/mysterious-anchorage-75151/web .

 docker run -it -p 8080:8080 registry.heroku.com/mysterious-anchorage-75151/web:latest


sudo docker push registry.heroku.com/mysterious-anchorage-75151/web:latest

heroku container:release web --app mysterious-anchorage-75151
