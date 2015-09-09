# bash start.sh #on ubuntu
function trap_ctrlc ()
{
   # perform cleanup here
   echo "Ctrl-C caught...performing clean up"
   pkill -f meteor
   echo "Doing cleanup"

   # exit shell script with error code 2
   # if omitted, shell script will continue execution
   exit 2
}

# initialise trap to call trap_ctrlc function
# when signal 2 (SIGINT) is received
trap "trap_ctrlc" 2

# if we have port use it
#var PORT = ${PORT:?"6001"}
${PORT:="6001"}

cd main
meteor add meteorhacks:cluster &
meteor --port $PORT > ../main.log &
cd ..
cd search
meteor add meteorhacks:cluster &
meteor --port 7001 > ../search.log &
cd ..
cd logging
meteor add meteorhacks:cluster &
meteor --port 8001 > ../logging.log &
cd ..
tail -f ./main.log
