#ifndef MENU_HPP
#define MENU_HPP

#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>

enum Choice
{
	singleplayer,
	multiplyer,
	option,
	leave,
	menu
};

class Menu
{
	public:
		Menu() = default;
		Menu(int widthh, int heightt, sf::Font fontt);
		Choice mainLoopOfMenu(sf::RenderWindow& window, sf::Event& event);
		void eventsOfMenu(sf::RenderWindow& window, sf::Event& event);
		void drawMenu(sf::RenderWindow& window);

	private:

		int					width;
		int					height;
		sf::Font			font;

		Choice				choice;
		bool				inMenu = 1;
		sf::RectangleShape	button[4];
};

#endif
