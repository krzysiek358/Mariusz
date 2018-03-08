#include "trace.hpp"

Trace::Trace(sf::Vector2f pos, sf::Color colorr, float sizee, short playerr)
{
	body.setRadius(sizee);
	body.setOrigin(sizee, sizee);
	body.setFillColor(colorr);
	body.setPosition(pos);

	player = playerr;
}

void Trace::draw(sf::RenderWindow& window)
{
	window.draw(body);
}

sf::Vector2f Trace::getPos()
{
	return body.getPosition();
}

float Trace::getLifeTime()
{
	return clock.getElapsedTime().asSeconds();
}

short Trace::getPlayer()
{
	return player;
}

void Trace::restart()
{
	clock.restart();
}