import React, { useState } from 'react';
import { Character, CharacterRole } from '../types';

interface CharacterIconProps {
  character: Character;
  onClick?: () => void;
  isSelected?: boolean;
}

const CharacterIcon: React.FC<CharacterIconProps> = ({ character, onClick, isSelected }) => {
  const [imgError, setImgError] = useState(false);

  const getRoleColor = (role: CharacterRole) => {
    switch (role) {
      case CharacterRole.VANGUARD: return 'border-blue-500';
      case CharacterRole.DUELIST: return 'border-red-500';
      case CharacterRole.STRATEGIST: return 'border-green-500';
      default: return 'border-slate-700';
    }
  };

  const getRoleBg = (role: CharacterRole) => {
    switch (role) {
      case CharacterRole.VANGUARD: return 'bg-blue-500';
      case CharacterRole.DUELIST: return 'bg-red-500';
      case CharacterRole.STRATEGIST: return 'bg-green-500';
      default: return 'bg-slate-700';
    }
  };
  
  const displayUrl = imgError 
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}&background=${character.role === CharacterRole.VANGUARD ? '3b82f6' : character.role === CharacterRole.DUELIST ? 'ef4444' : '22c55e'}&color=fff&bold=true`
    : character.imageUrl;

  return (
    <button
      onClick={onClick}
      className={`relative group transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-xl overflow-hidden border-2 ${isSelected ? 'ring-4 ring-yellow-400 scale-110 z-10' : 'border-slate-800 opacity-90 hover:opacity-100'} ${getRoleColor(character.role)} bg-slate-800 w-full aspect-square`}
    >
      <img 
        src={displayUrl} 
        alt={character.name} 
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1">
        <p className="text-[10px] font-black text-center truncate text-white leading-tight uppercase italic">{character.name}</p>
      </div>
      {/* Role Indicator Dot */}
      <div className={`absolute top-1 right-1 w-2 h-2 rounded-full border border-white/20 ${getRoleBg(character.role)} shadow-lg`}></div>
    </button>
  );
};

export default CharacterIcon;