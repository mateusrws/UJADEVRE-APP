import { Trophy, Award, User } from 'lucide-react';
import { getRankingMembers } from '../api/RakingMembers/getRankingMembers';

export function Ranking() {

  const members = getRankingMembers()
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
      <div className="flex items-center gap-3">
        <div className="bg-black p-2 rounded-xl">
          <Trophy className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-semibold">Ranking</h1>
      </div>

      <div className="flex flex-col gap-3">
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`flex items-center gap-4 bg-white rounded-2xl p-4 transition-all hover:shadow-md ${
              index < 3 ? 'shadow-sm border-2 border-black' : 'shadow-sm'
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 shrink-0">
              {index === 0 && (
                <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  1
                </div>
              )}
              {index === 1 && (
                <div className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  2
                </div>
              )}
              {index === 2 && (
                <div className="bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  3
                </div>
              )}
              {index > 2 && (
                <span className="text-gray-400 font-semibold text-lg">{index + 1}</span>
              )}
            </div>

            <div className="bg-gray-100 p-3 rounded-xl">
              <User size={24} className="text-gray-700" />
            </div>

            <div className="flex-1">
              <div className="font-semibold text-black text-lg">{member.name}</div>
              <div className="text-sm text-gray-500">{member.points} pontos</div>
            </div>

            {index < 3 && (
              <Award className="text-black" size={28} strokeWidth={2} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
