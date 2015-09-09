cd main
meteor --port 6001 > ../main.log &
cd ..
cd search
meteor --port 7001 > ../search.log &
cd ..
cd logging
meteor --port 8001 > ../logging.log &
cd ..
tail -f ./main.log
