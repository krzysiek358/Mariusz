#include "gracz.hpp"

//#define M_PI 3.1415926535897932

Player::Player(sf::Color colorr, sf::Vector2f pos, char leftt, char rightt, int xx, int yy, float sizee, float rott, bool endLesss)
{
	body.setRadius(sizee);
	body.setOrigin(sizee, sizee);
	body.setFillColor(colorr);

	line.setSize(sf::Vector2f(sizee/3.f, sizee));
	line.setOrigin(sizee/6.f, 0.f);
	line.setFillColor(sf::Color::Red);
	
	rot = rott;
	left = leftt;
	right = rightt;
	color = colorr;
	endLess = endLesss;
	width = xx;
	height = yy;
	size = sizee;

	body.setPosition(pos);
	line.setPosition(body.getPosition());
	body.setRotation(rot);
	line.setRotation(rot - 90);
}

void Player::update(float delta, float speed)
{
	if(sf::Keyboard::isKeyPressed(sf::Keyboard::A) && left == 'A')
		rot -= 1.5f * speed * delta;
	if(sf::Keyboard::isKeyPressed(sf::Keyboard::D) && right == 'D')
		rot += 1.5f * speed * delta;

	if(sf::Keyboard::isKeyPressed(sf::Keyboard::Left) && left == 'P')
		rot -= 1.5f * speed * delta;
	if(sf::Keyboard::isKeyPressed(sf::Keyboard::Right) && right == 'R')
		rot += 1.5f * speed * delta;

	if(sf::Keyboard::isKeyPressed(sf::Keyboard::J) && left == 'J')
		rot -= 1.5f * speed * delta;
	if(sf::Keyboard::isKeyPressed(sf::Keyboard::L) && right == 'L')
		rot += 1.5f * speed * delta;

	if(sf::Keyboard::isKeyPressed(sf::Keyboard::Numpad1) && left == '1')
		rot -= 1.5f * speed * delta;
	if(sf::Keyboard::isKeyPressed(sf::Keyboard::Numpad3) && right == '3')
		rot += 1.5f * speed * delta;

	if(rot > 360)
		rot -= 360;
	if(rot < 0)
		rot += 360;

	body.setRotation(rot);
	line.setRotation(rot - 90);

	sf::Vector2f dir(cos(rot * M_PI / 180.f), sin(rot * M_PI / 180.f));

	dir = dir * delta * speed * 1.5f;

	if(endLess)
	{
		if (body.getPosition().x > width - size)
			exist = 0;
		if (body.getPosition().x < 0 + size)
			exist = 0;
		if (body.getPosition().y > height - size)
			exist = 0;
		if (body.getPosition().y < 0 + size)
			exist = 0;
	}

	else
	{
		if (body.getPosition().x > width)
			body.setPosition(0, body.getPosition().y);
		if (body.getPosition().x < 0)
			body.setPosition(width, body.getPosition().y);
		if (body.getPosition().y > height)
			body.setPosition(body.getPosition().x, 0);
		if (body.getPosition().y < 0)
			body.setPosition(body.getPosition().x, height);
	}

	body.move(dir);
	line.setPosition(body.getPosition());
}

void Player::reset(sf::Vector2f pos, float rott)
{
	body.setPosition(pos);
	body.setRotation(rott - 90);
	line.setPosition(pos);
	line.setRotation(rott - 90);

	exist = 1;
	rot = rott;
}

void Player::draw(sf::RenderWindow& window)
{
	window.draw(body);
	window.draw(line);
}

void Player::changeTrace()
{
	if(trace == 1)
		trace = 0;
	
	else
		trace = 1;
}	

bool Player::getTrace()
{
	return trace;
}

sf::Color Player::getColor()
{
	return color;
}

sf::Vector2f Player::getPos()
{
	return body.getPosition();
}

void Player::addScore()
{
	score++;
}
		
short Player::getScore()
{
	return score;
}

void Player::setE()
{
	exist = 0;
}

bool Player::getE()
{
	return exist;
}
