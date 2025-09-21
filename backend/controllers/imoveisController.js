const Imovel = require('../models/Imovel');

exports.list = async (req, res) => {
  try {
    const imoveis = await Imovel.find().sort({ createdAt: -1 });
    res.json(imoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis', details: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const imovel = await Imovel.findById(req.params.id);
    if (!imovel) return res.status(404).json({ message: 'Imóvel não encontrado' });
    res.json(imovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóvel', details: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const imovel = new Imovel(req.body);
    await imovel.save();
    res.status(201).json(imovel);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar imóvel', details: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!imovel) return res.status(404).json({ message: 'Imóvel não encontrado' });
    res.json(imovel);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar imóvel', details: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndDelete(req.params.id);
    if (!imovel) return res.status(404).json({ message: 'Imóvel não encontrado' });
    res.json({ message: 'Imóvel removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover imóvel', details: error.message });
  }
};