import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useApp();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Saree & Blouse Size Guide
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-blue-900 leading-relaxed">
            <p className="font-semibold">Standard Saree Dimensions:</p>
            <p className="mt-1">
              Length: <span className="font-bold">5.5 Meters</span> (approx 6 yards)
              <br />
              Width: <span className="font-bold">1.14 Meters</span> (approx 45 inches)
              <br />
              Unstitched Blouse Fabric: <span className="font-bold">0.80 Meters</span>
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">Blouse Sizing (Inches)</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Bust</th>
                    <th className="py-2 px-3">Underbust</th>
                    <th className="py-2 px-3">Waist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 tabular-nums">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Free Size</td>
                    <td className="py-2 px-3">32" - 44" (Adjustable)</td>
                    <td className="py-2 px-3">28" - 38"</td>
                    <td className="py-2 px-3">Free</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">S</td>
                    <td className="py-2 px-3">34"</td>
                    <td className="py-2 px-3">28"</td>
                    <td className="py-2 px-3">26"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">M</td>
                    <td className="py-2 px-3">36"</td>
                    <td className="py-2 px-3">30"</td>
                    <td className="py-2 px-3">28"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">L</td>
                    <td className="py-2 px-3">38"</td>
                    <td className="py-2 px-3">32"</td>
                    <td className="py-2 px-3">30"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">XL</td>
                    <td className="py-2 px-3">40"</td>
                    <td className="py-2 px-3">34"</td>
                    <td className="py-2 px-3">32"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">XXL</td>
                    <td className="py-2 px-3">42"</td>
                    <td className="py-2 px-3">36"</td>
                    <td className="py-2 px-3">34"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <h5 className="font-semibold text-slate-800 mb-1">Draping Note:</h5>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Our traditional Indian sarees come with Free Size universal draping length suitable for heights between 4'10" and 5'11". Includes an attached 80cm unstitched blouse piece that can be custom tailored up to size 44".
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
