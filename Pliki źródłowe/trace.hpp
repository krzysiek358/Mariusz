#ifndef TRACE_HPP
#define TRACE_HPP

#include <SFML/Graphics.hpp>

class Trace
{
	public:

		Trace(sf::Vector2f pos, sf::Color colorr, float sizee, short playerr);
		void draw(sf::RenderWindow& window);
		sf::Vector2f getPos();
		float getLifeTime();
		short getPlayer();
		void restart();

	private:

		sf::Clock 			clock;
		sf::CircleShape 	body;

		short				player;
};

#endif