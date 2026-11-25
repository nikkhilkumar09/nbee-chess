import Game from '../models/gameModel.js';

export const getUserGames = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const games = await Game.find({
      $or: [{ 'whitePlayer.id': userId }, { 'blackPlayer.id': userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, games });
  } catch (error) {
    next(error);
  }
};

export const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }
    res.status(200).json({ success: true, game });
  } catch (error) {
    next(error);
  }
};
