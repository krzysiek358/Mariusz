#include "menu.hpp"

Menu::Menu(int widthh, int heightt, sf::Font fontt)
{
	width = widthh;
	height = heightt;

	for (int i = 0; i < 4; i++)
	{
		button[i].setSize(sf::Vector2f(194.f * (width / 800.f), 44.f * (height / 600.f)));
		button[i].setOrigin(button[i].getSize().x / 2.f, button[i].getSize().y / 2.f);
		button[i].setOutlineThickness(3.f);
		button[i].setFillColor(sf::Color::Magenta);
		button[i].setPosition(sf::Vector2f(width / 2.f, (height / 2.f) + (i * 52.f) * (height / 600.f)));
		button[i].setOutlineColor(sf::Color::Magenta);
	}

}
Choice Menu::mainLoopOfMenu(sf::RenderWindow& window, sf::Event& event)
{
	inMenu = 1;
	sf::FloatRect boxColisionOfButton[4];
	sf::Vector2f mouse;

	for (int i = 0; i < 4; i++)
		boxColisionOfButton[i] = button[i].getGlobalBounds();

	while (inMenu && window.isOpen())
	{
		eventsOfMenu(window, event);

		mouse = sf::Vector2f((float)(sf::Mouse::getPosition(window).x), (float)(sf::Mouse::getPosition(window).y));

		for (int i = 0; i < 4; i++)
		{
			button[i].setOutlineColor(sf::Color::Magenta);

			if (boxColisionOfButton[i].contains(mouse))
			{
				button[i].setOutlineColor(sf::Color::Yellow);

				if (sf::Mouse::isButtonPressed(sf::Mouse::Left))
				{
					if(i == 0)
						choice = Choice::singleplayer;
					else if (i == 1)
						choice = Choice::multiplyer;
					else if (i == 2)
						choice = Choice::option;
					else if (i == 3)
						choice = Choice::leave;

					inMenu = 0;
				}
			}
		}

		window.clear();

		drawMenu(window);

		window.display();
	}

	return choice;
}

void Menu::eventsOfMenu(sf::RenderWindow& window, sf::Event& event)
{
	while (window.pollEvent(event))
	{
		if (event.type == sf::Event::Closed)
			window.close();
	}
}
void Menu::drawMenu(sf::RenderWindow& window)
{
	for (int i = 0; i < 4; i++)
	{
		window.draw(button[i]);
	}
}
