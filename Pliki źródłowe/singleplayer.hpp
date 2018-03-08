#ifndef SINGLEPLAYER_HPP
#define SINGLEPLAYER_HPP

#include "gracz.hpp"
#include "trace.hpp"
#include <vector>

enum GameState
{
	runing,
	pause,
	reset,
	endGame
};

class Singleplayer
{
	public:
		Singleplayer() = default;
		Singleplayer(int widthh, int heightt, float sizee, float speed, bool endLesss, short playerss, sf::Color colorss[4], sf::Font fontt);
		void eventsOfSingleplayer(sf::RenderWindow& window, sf::Event& event);
		void mainLoopOfSingleplayer(sf::RenderWindow& window, sf::Event& event);
	private:

		std::vector<Trace>	trace;
		
		GameState			gameState = GameState::pause;

		Player*				player;
		sf::Event 			event;
		sf::Clock 			clock_delta;
		sf::Clock 			clock_trace;
		sf::Clock			clock_draw;
		sf::Clock 			clock_draw2;
		sf::Font			font;
		sf::Text			text;

		short				win = 0;
		short 				width;
		short 				height;
		float				size;
		float 				speed;
		bool 				endLess;
		float 				delta;
		short				players;
		short				ePlayers;

		bool				backToMenu = 0;
};

#endif
