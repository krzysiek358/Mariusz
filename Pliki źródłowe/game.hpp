#ifndef GAME_HPP
#define GAME_HPP

#include <SFML/Graphics.hpp>
#include <vector>
#include <fstream>
#include <iostream>

#include "menu.hpp"
#include "singleplayer.hpp"
#include "multiplyer.hpp"

class Game
{
	public:
		 Game();
		 void mainLoop();
		 void load_from_file(std::string file_name);
	
	private:

		sf::ContextSettings settings;
		sf::RenderWindow 	window;
		sf::Event 			event;
		sf::Uint32			style;

		sf::Color* 			colors;
		std::vector<Trace>	trace;
		Menu				menu;
		Choice				choice = Choice::menu;

		short 				players;

		short 				width;
		short 				height;
		bool 				full_screen;
		short 				anti_aliasing;
		float				size;
		float 				speed;
		bool 				endLess;

		sf::Font 			font;
		sf::Text 			text;

};

#endif
