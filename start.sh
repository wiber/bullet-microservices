cd main
meteor --port 6001 > ../main.log &
cd ..
cd logging
meteor --port 7001 > ../logging.log &
cd ..
cd search
meteor --port 8001 > ../search.log &
tail -f /Users/tapmate/github/bullet-micro/main.log