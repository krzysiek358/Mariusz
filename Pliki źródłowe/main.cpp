#include <iostream>
#include <SFML/Graphics.hpp>
#include <math.h>
#include <vector>
#include <fstream>
#include <cstdlib>
#include <time.h>

//#define M_PI 3.1415926535897932

#include "game.hpp"

int main()
{
	Game game;

	game.mainLoop();

	return 0;
}