require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

ROOT = File.expand_path(File.dirname(__FILE__))
SRC_DIR = File.join(ROOT, 'src')
DIST_DIR = File.join(ROOT, 'dist')

task :default => :dist

desc 'Builds the distribution.'
task :dist => [:jquery, :jquery_ui, 'sprocketize:prototype', 'sprocketize:wysihat', 'sprocketize:toolbar']

desc 'Remove files created during the build'
task :clean => ['sprocketize:clean']

desc 'Update git submodules'
task :update_submodules do
  system('git submodule init')
  system('git submodule update')
end

namespace :sprocketize do
  task :dist_dir do
    FileUtils.mkdir_p(DIST_DIR)
  end
  
  task :clean do
    FileUtils.rm_rf(DIST_DIR)
  end
  
  task :toolbar => [:update_submodules, :dist_dir] do
    require File.join(ROOT, 'vendor', 'sprockets', 'lib', 'sprockets')
    
    secretary = Sprockets::Secretary.new(
      :root         => File.join(ROOT, 'src'),
      :load_path    => [SRC_DIR],
      :source_files => ['wysihat/fancy_toolbar.js']
    )
        
    secretary.concatenation.save_to(File.join(DIST_DIR, 'wysihat.fancy_toolbar.js'))
  end
  
  task :wysihat => [:update_submodules, :dist_dir] do
    require File.join(ROOT, 'vendor', 'sprockets', 'lib', 'sprockets')

    wysihat_root = File.join(ROOT, 'vendor', 'wysihat')
    wysihat_src_dir = File.join(ROOT, wysihat_root, 'src')

    secretary = Sprockets::Secretary.new(
      :root         => File.join(wysihat_root, 'src'),
      :load_path    => [wysihat_src_dir],
      :source_files => ['wysihat.js']
    )

    secretary.concatenation.save_to(File.join(DIST_DIR, 'wysihat.js'))
  end

  task :prototype => [:update_submodules, :dist_dir] do
    require File.join(ROOT, 'vendor', 'sprockets', 'lib', 'sprockets')

    prototype_root = File.join(ROOT, 'vendor', 'prototype')
    prototype_src_dir = File.join(prototype_root, 'src')

    secretary = Sprockets::Secretary.new(
      :root         => File.join(prototype_root, 'src'),
      :load_path    => [prototype_src_dir],
      :source_files => ['prototype.js']
    )

    secretary.concatenation.save_to(File.join(DIST_DIR, 'prototype.js'))
  end
end

task :jquery => ['sprocketize:dist_dir', File.join(DIST_DIR, 'jquery.js')]
file File.join(DIST_DIR, 'jquery.js') => [File.join(ROOT, 'vendor', 'jquery', 'jquery-1.4.2.min.js')] do |task|
  FileUtils.cp task.prerequisites[0], task.name
end

task :jquery_ui => ['sprocketize:dist_dir', File.join(DIST_DIR, 'jquery-ui.js'), File.join(DIST_DIR, 'jquery-ui')]
file File.join(DIST_DIR, 'jquery-ui.js') => [File.join(ROOT, 'vendor', 'jquery-ui', 'js', 'jquery-ui-1.8.2.min.js')] do |task|
  FileUtils.cp task.prerequisites[0], task.name
end
file File.join(DIST_DIR, 'jquery-ui') => [File.join(ROOT, 'vendor', 'jquery-ui', 'css')] do |task|
  FileUtils.mkdir_p task.name
  FileUtils.cp_r task.prerequisites[0], File.join(task.name, 'css')
  Dir.glob(File.join(task.name, 'css', '**', 'jquery-ui-1.8.2.css')) do |dir|
    FileUtils.mv dir, dir.gsub('jquery-ui-1.8.2.css', 'jquery-ui.css')
  end
end
