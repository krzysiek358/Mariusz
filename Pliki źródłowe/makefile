all:
	g++ -g -std=c++11 main.cpp game.cpp gracz.cpp menu.cpp multiplayer.cpp singleplayer.cpp trace.cpp -lsfml-graphics -lsfml-window -lsfml-system -o main.out
mingw:
	i686-w64-mingw32-gcc -g  main.cpp -lsfml-graphics -lsfml-window -lsfml-system -o main.out
	i686-w64-mingw32-gcc  main.o -o main.exe
cleam:
	rm *.o *.exe 