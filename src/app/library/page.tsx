"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Upload, 
  Plus, 
  File, 
  Folder, 
  MoreHorizontal, 
  Filter, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Table, 
  FileCode,
  X
} from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { libraryItems } from "@/lib/site";

const FILTERS = [
  { label: "All files", value: "all" },
  { label: "Videos", value: "Video" },
  { label: "Images", value: "Image" },
  { label: "Text", value: "Text" },
  { label: "Folders", value: "Folder" },
];

function getFileIcon(type: string) {
  const size = 18;
  const props = { size, strokeWidth: 1.5, className: "text-muted" };
  
  switch (type) {
    case "Video": return <Video {...props} />;
    case "Image": return <ImageIcon {...props} />;
    case "Text": return <FileText {...props} />;
    case "Folder": return <Folder {...props} className="text-muted fill-current opacity-20" />;
    case "Spreadsheet": return <Table {...props} />;
    case "Document": return <FileText {...props} />;
    default: return <File {...props} />;
  }
}

export default function LibraryPage() {
  const [items, setItems] = useState(libraryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newItems = Array.from(files).map((file) => ({
      name: file.name,
      kind: "file" as const,
      type: file.type.includes("image") ? "Image" : file.type.includes("video") ? "Video" : "Text",
      meta: `${(file.size / 1024).toFixed(1)} KB · uploaded just now`,
      accent: "bg-panelSoft text-muted",
    }));
    setItems((prev) => [...newItems, ...prev]);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "Folder" ? item.kind === "folder" : item.type === activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, activeFilter]);

  return (
    <SiteShell
      active="library"
      title="Content Library"
      subtitle="Manage, filter, and inspect assets."
    >
      <style>{`
        .lib-page { 
          --border: var(--border-default); 
          --bg: var(--bg-primary); 
          --text: var(--text-primary); 
          --muted: var(--text-secondary); 
        }

        /* Upload zone — Tight Vercel-style dashed area */
        .upload-zone {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px dashed var(--border-default);
          padding: 40px 24px;
          text-align: center;
          transition: border-color .15s, background .15s;
          background: var(--bg-secondary);
          cursor: pointer;
        }
        .upload-zone:hover { border-color: var(--border-hover); background: var(--bg-tertiary); }
        .upload-zone.dragging { border-color: var(--text-primary); background: var(--bg-active); }
        .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

        .upload-icon-box {
          width: 40px; height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border-default);
          background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .upload-title { font-size: 13px; font-weight: 500; color: var(--text-primary); }
        .upload-sub   { font-size: 12px; color: var(--text-secondary); margin-top: 2px; margin-bottom: 16px; }

        /* Generic buttons mapping to Vercel styles */
        .btn-black {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--text-primary); color: var(--bg-primary);
          border-radius: 6px; padding: 0 12px; height: 32px;
          font-size: 12px; font-weight: 500; border: none; cursor: pointer;
        }
        .btn-white {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--bg-primary); color: var(--text-primary);
          border: 1px solid var(--border-default);
          border-radius: 6px; padding: 0 12px; height: 32px;
          font-size: 12px; font-weight: 500; cursor: pointer;
        }
        .btn-white:hover { border-color: var(--border-hover); background: var(--bg-secondary); }

        /* Toolbar */
        .toolbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 12px 0;
          border-bottom: 1px solid var(--border-default);
          margin-bottom: 8px;
        }

        .search-wrap {
          position: relative; flex: 1; max-width: 320px;
        }
        .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; }
        .search-input {
          width: 100%; height: 32px;
          background: transparent; border: none;
          padding: 0 32px 0 34px; font-size: 13px; color: var(--text-primary);
          outline: none;
        }
        .search-clear { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); background: none; border: none; cursor: pointer; }

        /* Filter pills */
        .filter-pills { display: flex; align-items: center; gap: 4px; }
        .filter-pill {
          height: 28px; padding: 0 10px; border-radius: 6px;
          font-size: 12px; font-weight: 500; cursor: pointer; border: none;
          transition: all .1s;
        }
        .filter-pill.active   { background: var(--text-primary); color: var(--bg-primary); }
        .filter-pill.inactive { background: transparent; color: var(--text-secondary); }
        .filter-pill.inactive:hover { background: var(--bg-secondary); color: var(--text-primary); }

        /* Item rows — Tighter layout */
        .item-list { display: flex; flex-direction: column; }
        .item-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 4px;
          border-bottom: 1px solid var(--border-default);
          transition: background .1s;
        }
        .item-row:hover { background: var(--bg-secondary); }

        .item-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .icon-container {
          width: 36px; height: 36px; border-radius: 6px;
          border: 1px solid var(--border-default);
          background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
        }
        .item-name { font-size: 13px; font-weight: 500; color: var(--text-primary); }
        .item-meta { font-size: 12px; color: var(--text-secondary); }
        
        .item-badge {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          color: var(--text-tertiary); letter-spacing: 0.05em;
          padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-default);
          margin-left: 8px;
        }

        .item-actions { display: flex; align-items: center; gap: 4px; opacity: 0; transition: opacity .1s; }
        .item-row:hover .item-actions { opacity: 1; }
        .action-btn {
          height: 28px; padding: 0 10px; border-radius: 6px;
          font-size: 12px; font-weight: 500; background: var(--bg-primary);
          border: 1px solid var(--border-default); color: var(--text-secondary);
          cursor: pointer;
        }
        .action-btn:hover { border-color: var(--border-hover); color: var(--text-primary); background: var(--bg-secondary); }
        .more-btn { width: 28px; padding: 0; display: flex; align-items: center; justify-content: center; }

        .list-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 4px 8px;
        }
        .list-header-title { font-size: 11px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
        .count-label { font-size: 11px; color: var(--text-tertiary); }
      `}</style>

      <div className="lib-page space-y-8">
        
        {/* ── Page Header ── */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="headline text-2xl font-bold tracking-tight">Library</h1>
            <p className="text-sm text-muted">
              Centralized repository for your creative assets and performance data.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-white"><Filter size={14} /> Filter</button>
            <button className="btn-black"><Plus size={14} /> New Folder</button>
          </div>
        </div>

        {/* ── Upload Area ── */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e.dataTransfer.files); }}
          className={`upload-zone${isDragging ? " dragging" : ""}`}
        >
          <input type="file" multiple onChange={(e) => handleFileUpload(e.target.files)} />
          <div className="upload-icon-box">
            <Upload size={18} strokeWidth={2} />
          </div>
          <p className="upload-title">Click or drag to upload</p>
          <p className="upload-sub">Supports images, videos, and raw data files.</p>
          <button className="btn-black" onClick={(e) => e.stopPropagation()}>
            <Plus size={14} /> Add files
          </button>
        </div>

        {/* ── Content ── */}
        <div>
          <div className="toolbar">
            <div className="search-wrap">
              <Search className="search-icon" size={14} />
              <input
                className="search-input"
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery("")}>
                  <X size={12} />
                </button>
              )}
            </div>
            <div className="filter-pills">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`filter-pill ${activeFilter === f.value ? "active" : "inactive"}`}
                  onClick={() => setActiveFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="list-header">
            <span className="list-header-title">All Assets</span>
            <span className="count-label">{filteredItems.length} items</span>
          </div>

          <div className="item-list">
            {filteredItems.map((item) => (
              <div key={item.name} className="item-row group">
                <div className="item-left">
                  <div className="icon-container">
                    {getFileIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="item-name truncate">{item.name}</p>
                    <p className="item-meta">{item.meta}</p>
                  </div>
                  <span className="item-badge">{item.type}</span>
                </div>
                <div className="item-actions">
                  <button className="action-btn">View</button>
                  <button className="action-btn">Download</button>
                  <button className="action-btn more-btn">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

