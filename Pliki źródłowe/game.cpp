#include "game.hpp"

Game::Game()
{
	srand(time(NULL));

	load_from_file("Options.txt");

	window.create(sf::VideoMode(width, height, 32), "Abrakadabra", style, settings);

	font.loadFromFile("KaushanScript-Regular.otf");

	menu = Menu(width, height, font);
}

void Game::mainLoop()
{
	while (window.isOpen())
	{
		if (choice == Choice::menu)
		{
			choice = menu.mainLoopOfMenu(window, event);
		}

		else if (choice == Choice::singleplayer)
		{
			Singleplayer singleplayer(width, height, size, speed, endLess, players, colors, font);

			singleplayer.mainLoopOfSingleplayer(window, event);

			choice = Choice::menu;
		}

		else if (choice == Choice::multiplyer)
		{
			choice = Choice::menu;
		}

		else if (choice == Choice::option)
		{
			choice = Choice::menu;
		}

		else if (choice == Choice::leave)
		{
			window.close();
		}
	}
}

void Game::load_from_file(std::string file_name)
{
	std::ifstream file;
	std::string option;
	int r[4], g[4] ,b[4] ,a[4];
	
	file.open(file_name);
		file >> option;
		if(option == "Width:")
			file >> width >> option;
		if(option == "Height:")
			file >> height >> option;
		if(option == "Fullscreen:")
			file >> full_screen >> option;
		if(option == "antyaliasing:")
			file >> anti_aliasing >> option;
		if(option == "Nuber_of_Player(max_4):")
			file >> players >> option;
		if(option == "Size_of_Player:")
			file >> size >> option;
		if(option == "Speed_of_Players:")
			file >> speed >> option;
		if(option == "Endless:")
			file >> endLess >> option;
		if(option == "Color_of_Player_1:")
			file >> r[0] >> g[0] >> b[0] >> a[0] >> option;
		if(option == "Color_of_Player_2:")
			file >> r[1] >> g[1] >> b[1] >> a[1] >> option;
		if(option == "Color_of_Player_3:")
			file >> r[2] >> g[2] >> b[2] >> a[2] >> option;
		if(option == "Color_of_Player_4:")
			file >> r[3] >> g[3] >> b[3] >> a[3];
	file.close();

	if(players < 1)
		players = 1;
	if(players > 4)
		players = 4;

	colors = new sf::Color[players];

	for (int i = 0; i < players; i++)
		colors[i] = sf::Color(r[i], g[i], b[i], a[i]);

	settings.antialiasingLevel = anti_aliasing;
	if(full_screen == 0)
		style = sf::Style::Close;
	else
		style = sf::Style::Fullscreen;

}