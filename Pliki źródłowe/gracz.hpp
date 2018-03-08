#ifndef GRACZ_HPP
#define GRACZ_HPP

#include <SFML/Graphics.hpp>

class Player
{
	public:

		Player() = default;
		Player(sf::Color colorr, sf::Vector2f pos, char leftt, char rightt, int xx, int yy, float sizee, float rott, bool endLesss);
		void update(float delta, float speed);
		void draw(sf::RenderWindow& window);
		void reset(sf::Vector2f pos, float rott);
		void changeTrace();
		bool getTrace();
		sf::Color getColor();
		sf::Vector2f getPos();
		void addScore();
		short getScore();
		void setE();
		bool getE();

	private:

		sf::CircleShape 	body;
		sf::RectangleShape 	line;

		sf::Color 			color;
		short				score = 0;
		bool				trace = 1;

		float 				rot = 0;
		char				left;
		char 				right;
		int 				width;
		int					height;
		float 				size;
		bool 				exist = 1;
		bool 				endLess;
};

#endif
