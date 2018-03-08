#include "singleplayer.hpp"

float dst(sf::Vector2f pos1, sf::Vector2f pos2)
{
	return sqrt(pow(pos1.x - pos2.x, 2) + pow(pos1.y - pos2.y, 2));
}

Singleplayer::Singleplayer(int widthh, int heightt, float sizee, float speedd, bool endLesss, short playerss, sf::Color colorss[4], sf::Font fontt)
{
	width = widthh;
	height = heightt;
	size = sizee;
	speed = speedd;
	endLess = endLesss;
	players = playerss;
	font = fontt;

	player = new Player[players];

	if (players > 0)
		player[0] = Player(colorss[0], sf::Vector2f(width * 0.1f, height * 0.1f), 'A', 'D', width, height, size, 45, endLess);
	if (players > 1)
		player[1] = Player(colorss[1], sf::Vector2f(width * 0.9f, height * 0.9f), 'P', 'R', width, height, size, 225, endLess);
	if (players > 2)
		player[2] = Player(colorss[2], sf::Vector2f(width * 0.9f, height * 0.1f), 'J', 'L', width, height, size, 135, endLess);
	if (players > 3)
		player[3] = Player(colorss[3], sf::Vector2f(width * 0.1f, height * 0.9f), '1', '3', width, height, size, 315, endLess);
}

void Singleplayer::mainLoopOfSingleplayer(sf::RenderWindow& window, sf::Event& event)
{
	while (backToMenu != 1)
	{
		eventsOfSingleplayer(window, event);

		if (gameState == GameState::reset)
		{
			if (players > 0)
				player[0].reset(sf::Vector2f(width * 0.1f, height * 0.1f), 45);
			if (players > 1)
				player[1].reset(sf::Vector2f(width * 0.9f, height * 0.9f), 225);
			if (players > 2)
				player[2].reset(sf::Vector2f(width * 0.9f, height * 0.1f), 135);
			if (players > 3)
				player[3].reset(sf::Vector2f(width * 0.1f, height * 0.9f), 315);

			gameState = GameState::pause;
			trace.clear();

			delta = clock_delta.restart().asSeconds();
		}

		if (gameState == GameState::runing)
		{
			for (int i = 0; i < players; ++i)
				if (player[i].getE())
					player[i].update(delta, speed);

			for (int i = 0; i < trace.size(); ++i)
				for (int j = 0; j < players; ++j)
					if (player[j].getE())
						if (dst(player[j].getPos(), trace[i].getPos()) < (size + (size / 1.5f)) && trace[i].getLifeTime() > 0.06f * (120 / speed) * (size / 6.f) ||
							dst(player[j].getPos(), trace[i].getPos()) < (size + (size / 1.5f)) && trace[i].getPlayer() != j)
							player[j].setE();

			if (clock_trace.getElapsedTime().asSeconds() > 0.05f / (speed / 60.f) / (size / 6.f))
			{
				for (int i = 0; i < players; ++i)
					if (player[i].getE())
						trace.push_back(Trace(player[i].getPos(), player[i].getColor(), size, i));
				clock_trace.restart();
			}

			for (int i = 0; i < players; ++i)
				if (player[i].getE())
					ePlayers++;

			if (ePlayers < 2)
			{
				for (int i = 0; i < players; ++i)
					if (player[i].getE())
					{
						player[i].addScore();
						win = i + 1;
					}
				gameState = GameState::endGame;
			}
			ePlayers = 0;
		}

		if (gameState == GameState::pause)
			for (int i = 0; i < trace.size(); i++)
				trace[i].restart();

		if (gameState == GameState::endGame)
		{
			text.setFont(font);
			text.setCharacterSize(width * 0.025f);
			text.setStyle(sf::Text::Regular);

			std::string sentence;

			if (win == 1)
				sentence = "Wygral Gracz 1 (A, D)";
			else if (win == 2)
				sentence = "Wygral Gracz 2 (Left, right)";
			else if (win == 3)
				sentence = "Wygral Gracz 3 (J, L)";
			else if (win == 4)
				sentence = "Wygral Gracz 4 (1,3)";
			else 
				sentence = "Draw!!!";

			if (players > 0)
				sentence += "\n Wynika gracza1: " + std::to_string(player[0].getScore());
			if (players > 1)
				sentence += "\n Wynika gracza2: " + std::to_string(player[1].getScore());
			if (players > 2)
				sentence += "\n Wynika gracza3: " + std::to_string(player[2].getScore());
			if (players > 3)
				sentence += "\n Wynika gracza4: " + std::to_string(player[3].getScore());

			text.setString(sentence);
			//text.setFillColor(sf::Color(102, 102, 102));
		}

		if(gameState != GameState::endGame)
			window.clear();

		if (gameState == GameState::endGame)
			window.draw(text);

		if (gameState != GameState::endGame)
		{
			for (int i = 0; i < trace.size(); ++i)
				trace[i].draw(window);
			for (int i = 0; i < players; ++i)
				if (player[i].getE())
					player[i].draw(window);
		}
		window.display();

		delta = clock_delta.restart().asSeconds();
	}
}
void Singleplayer::eventsOfSingleplayer(sf::RenderWindow& window, sf::Event& event)
{
	while (window.pollEvent(event))
	{
		if (event.type == sf::Event::Closed)
		{
			backToMenu = 1;
			window.close();
		}
		if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::Escape)
			backToMenu = 1;
		if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::Space)
		{
			if (gameState == GameState::pause)
				gameState = GameState::runing;
			else if(gameState == GameState::runing)
				gameState = GameState::pause;
		}
		if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::R && gameState == GameState::endGame)
			gameState = GameState::reset;
	}
}
